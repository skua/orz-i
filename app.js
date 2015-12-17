var koa = require('koa.io');

var _ = require('lodash');
var util = require('util');
var path = require('path');
var swig = require('swig');
var koaBody = require('koa-body');

//  redis 方案
// var session = require('koa-generic-session');
// var redisStore = require('koa-redis');
//  redis 方案
var session = require('koa-session');
var minifier = require('koa-html-minifier');
var assets = require('koa-static-cache');
var config = require('./config');
var request = require('request');
var support = require('./support');
var service = require('./modules/common/service');
var compose = require('koa-compose');
var config = require('./config');
var sign = require('./support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var cluster = require('cluster');
var cpus = require('os').cpus();

// 加载swig过滤器
require('./config/filter');

var app = module.exports = koa();



// 访问静态资源 版本号防缓存
app.use(compose([
  function*(next) {
    if (this.path.indexOf('/assets/') === 0) {
      this.path = this.path.replace(/.v.[\d\w]+/i, '');
    }
    yield * next;
  },
  assets(config.assets, {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
    prefix: '/assets'
  })
]));



// 设置秘钥
app.keys = ['LWXA@0ZrXj~!]/mNHH98j/3yX R,?RT'];

app.use(session(app, {
  key: 'H',
  maxage: 365 * 24 * 60 * 60 * 1000 // 一年过期
}));



// 基于redis
// 会话
// var sessionGen = session({
//   key: 'T',
//   ttl: 2 * 60 * 60 * 1000, // 2小时缓存
//   store: redisStore({
//     host: config.redis.host,
//     port: config.redis.port,
//   }),
//   cookie: {
//     maxage: 365 * 24 * 60 * 60 * 1000
//   }
// });

// // 设置SESSION
// app.use(sessionGen);


// 去除HTML页面中的换行和空白
// app.use(minifier({
//   minifyJS: true,
//   minifyCSS: true,
//   collapseWhitespace: true,
//   keepClosingSlash: true,
//   removeComments: true,
//   processScripts: ['text/swig-template']
// }));

// 微信授权
global.wxRequired = function(app) {

  var url = config.domain + app.req.url;
  return function*(next) {
    var makeTime = function() {
      return parseInt(new Date().getTime() / 1000);
    }

    var accessToken = {};
    if ((!global.accessToken) || (!!global.accessToken && global.accessToken.expire_time < makeTime())) {


      if (!global.accessToken) {
        console.log("不存在global.accessToken");
      }
      if (!!global.accessToken && global.accessToken.expire_time < makeTime()) {
        console.log("global.accessToken过期" + "old:" + global.accessToken.expire_time + ",new:" + makeTime());
      }

      accessToken = yield service.accessToken();
      var access_token = {
        expire_time: makeTime() + 7200,
        access_token: accessToken.access_token
      };
      accessToken = yield access_token;
      global.accessToken = accessToken;

      console.log("global.accessToken存在了，" + "old:" + global.accessToken.expire_time + ",new:" + makeTime());

    } else {

      console.log("存在global.accessToken，" + "old:" + global.accessToken.expire_time + ",new:" + makeTime());
      accessToken = global.accessToken;
    }
    yield accessToken;


    var getJsApiTicket = {};
    if ((!global.jsapiTicket) || (!!global.jsapiTicket && global.jsapiTicket.expire_time < makeTime())) {

      if (!global.jsapiTicket) {
        console.log("不存在global.jsapiTicket");
      }
      if (!!global.jsapiTicket && global.jsapiTicket.expire_time < makeTime()) {
        console.log("global.jsapiTicket过期" + "old:" + global.jsapiTicket.expire_time + ",new:" + makeTime());
      }


      getJsApiTicket = yield service.ticket(accessToken.access_token);
      var jsapi_ticket = {
        expire_time: makeTime() + 7200,
        jsapi_ticket: getJsApiTicket.ticket
      };
      getJsApiTicket = yield jsapi_ticket;
      global.jsapiTicket = getJsApiTicket;
      console.log("global.jsapiTicket存在了，" + "old:" + global.jsapiTicket.expire_time + ",new:" + makeTime());
    } else {
      console.log("存在global.jsapiTicket，" + "old:" + global.jsapiTicket.expire_time + ",new:" + makeTime());
      getJsApiTicket = global.jsapiTicket;
    }

    yield getJsApiTicket;


    var signature = sign(getJsApiTicket.jsapi_ticket, url);
    signature.appid = config.wxconfig.appid;
    signature = yield signature;
    return signature;

  };
};



// 解析form
app.use(koaBody({
  strict: false,
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../upload')
  }
}));

// 判断是否是内嵌浏览器
app.use(function*(next) {
  var userAgent = (this.headers['user-agent'] || '').toLowerCase();

  // 客户端判断
  this.ua = {
    ios: userAgent.indexOf('mobile/') !== -1 && userAgent.indexOf('safari/') === -1,
    android: (this.headers['x-requested-with'] || '').indexOf('qding') !== -1,
    weixin: userAgent.indexOf('micromessenger') !== -1,
    ali: userAgent.indexOf('ali') !== -1
  };

  // 是否是APP
  this.ua.app = !this.ua.weixin && !this.ua.ali && (this.ua.ios || this.ua.android);

  // 是否是Ajax
  this.request.isAjax = this.headers['x-requested-with'] === 'XMLHttpRequest';

  yield next;
});

// 设置模板引擎
app.use(function*(next) {
  this.render = function(name) {
    // 构造数据
    var data = {};

    // 字符串处理
    if (_.isString(arguments[1])) {
      data.message = arguments[1];
    }
    // 合并数据
    else {
      _.merge.apply(_, [data].concat(Array.prototype.splice.call(arguments, 1)));
    }

    // 返回接口
    if (_.isNumber(name)) {
      return {
        code: name,
        data: data
      }
    }

    // 返回页面
    if (/^[^./]/i.test(name)) {
      var folder = path.dirname(support.callsite()[1].getFileName());
      name = path.resolve(folder, name);
    }

    // 添加UA数据
    data = _.merge(data, {
      ua: this.ua,
      nested: this.ua.ios || this.ua.android || this.ua.weixin,
    });
    return swig.renderFile(name, data);
  };

  yield next;
});


// 遍历目录加载路由模块
support.walk(__dirname).forEach(function(path) {
  if (/\broutes\.js$/.test([path])) {
    var router = require(path);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
});

//app.io.use();

// 启动服务器
if (cluster.isMaster) {
  for (var i = 0; i < cpus.length; i++) {
    cluster.fork();
  }
} else {
  app.listen(config.port, function() {
    console.log('clustor worker %d started, pid is %d, listening on port: %d', cluster.worker.id, process.pid, config.port);
  });

}