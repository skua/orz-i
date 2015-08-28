var koa = require('koa');
var _ = require('lodash');
var util = require('util');
var path = require('path');
var swig = require('swig');
var koaBody = require('koa-body');
var router = require('koa-router');
var assets = require('koa-static-cache');
var config = require('./config');
var request = require('request');
var support = require('./support');
var service = require('./modules/test/service');
var config = require('./config');
var sign = require('./support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var cluster = require('cluster');
var cpus = require('os').cpus();



var app = module.exports = koa();

// 静态资源
app.use(assets(config.assets, {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true,
  prefix: '/assets'
}));

// 微信授权
global.wxRequired = function(app) {

  var url = config.domain + app.req.url;
  return function*(next) {
    var makeTime = function() {
      return parseInt(new Date().getTime() / 1000);
    }
    var accessToken = {};
    var cache_access_token = JSON.parse(fs.readFileSync(path.join(__dirname, './cache/access_token.json')));
    yield cache_access_token;
    if (cache_access_token.expire_time < makeTime()) {
      accessToken = yield service.accessToken();
      var access_token = {
        expire_time: makeTime() + 7200,
        access_token: accessToken.access_token
      };
      fs.writeFileSync(path.join(__dirname, './cache/access_token.json'), JSON.stringify(access_token));
      accessToken = yield access_token;
    } else {
      accessToken = cache_access_token;
    }
    yield accessToken;
    //access_token 结束

    var getJsApiTicket = {};
    var cache_jsapi_ticket = JSON.parse(fs.readFileSync(path.join(__dirname, './cache/jsapi_ticket.json')));
    yield cache_jsapi_ticket;
    if (cache_jsapi_ticket.expire_time < makeTime()) {
      getJsApiTicket = yield service.ticket(accessToken.access_token);
      var jsapi_ticket = {
        expire_time: makeTime() + 7200,
        jsapi_ticket: getJsApiTicket.ticket
      };
      fs.writeFileSync(path.join(__dirname, './cache/jsapi_ticket.json'), JSON.stringify(jsapi_ticket));
      getJsApiTicket = yield jsapi_ticket;
    } else {
      getJsApiTicket = cache_jsapi_ticket;
    }
    yield getJsApiTicket;
    //jsapi_ticket 结束

    var signature = sign(getJsApiTicket.jsapi_ticket, url);
    signature.appid = config.wxconfig.appid;
    signature = yield signature;

    return signature;
      // 以上全程必须同步
  };
};



// 设置模板
app.use(function*(next) {
  var context = this;

  this.template = {

    render: function(template) {

      // 合并数据模型 
      var data = {};
      if (arguments.length === 2 && _.isString(arguments[1])) {
        data.message = arguments[1];
      } else {
        for (var i = 1; i < arguments.length; i++) {
          if (_.isObject(arguments[i])) {
            _.merge(data, arguments[i]);
          }
        }
      }

      // 兼容JSON响应
      if (_.isNumber(template)) {
        return this.renderJSON(template, data);
      }

      // 确定回调函数
      var callback = arguments[arguments.length - 1];
      callback = _.isFunction(callback) ? callback : null;

      // 根据相对位置查找模板
      if (/^[^./]/i.test(template)) {
        var folder = path.dirname(support.callsite()[1].getFileName());
        template = path.resolve(folder, template);
      }

      return swig.renderFile(template, data, callback);
    },

    // 用来渲染JSON
    renderJSON: function(code, data) {
      return {
        code: code,
        data: data
      };
    }
  };

  yield next;
});


app.use(router(app));

// 遍历目录加载路由模块
support.walk(__dirname, function(error, result) {
  result.filter(function(path) {
    return /\broutes\.js$/.test([path]);
  }).forEach(function(routes) {
    require(routes.replace(__dirname, '.'));
  });
});



// 启动服务器
if (cluster.isMaster) {
  for (var i = 0; i < cpus.length; i++) {
    cluster.fork();
  }
}
else {
  app.listen(config.port, function () {
    console.log('clustor worker %d started, pid is %d, listening on port: %d', cluster.worker.id, process.pid, config.port );
  });
}



