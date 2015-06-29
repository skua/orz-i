/**
 * Module dependencies.
 */
var parse = require('co-body');
var render = require('./lib/render');

//db 

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var jsSHA = require('jssha');

var https = require('https');


var appid = "wx968f0697f984ba93";
var secret = "4ebe9326c709b80b7df7ee4639cd1d2c";

var _url = "http://io.orz-i.com";

// 链接mongo
//local 库名
//testData 集合名称

var db = monk('localhost/local');

var test = wrap(db.get('test'));
test.find({}, function(err, docs) {
  console.log(docs);
})




  // 随机字符串产生函数
  var createNonceStr = function() {
    return Math.random().toString(36).substr(2, 15);
  };

  // 时间戳产生函数
  var createTimeStamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
  };


    // 计算签名
  var calcSignature = function (ticket, noncestr, ts, url) {
    var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
    shaObj = new jsSHA(str, 'TEXT');
    return shaObj.getHash('SHA-1', 'HEX');
  }


// // 获取微信签名所需的access_token
// https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret, function(_res) {
//   var str = '';
//   _res.on('data', function(data) {
//     str += data;
//   });
//   _res.on('end', function() {
//     console.log('return access_token:  ' + str);
//     try {
//       var resp = JSON.parse(str);
//     } catch (e) {
//       return errorRender(res, '解析access_token返回的JSON数据错误', str);
//     }

//     getTicket(_url, resp);
//   });
// });



// // 获取微信签名所需的ticket
// var getTicket = function(url, accessData) {
//   https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessData.access_token + '&type=jsapi', function(_res) {
//     var str = '',
//       resp;
//     _res.on('data', function(data) {
//       str += data;
//     });
//     _res.on('end', function() {
//       console.log('return ticket:  ' + str);
//       try {
//         resp = JSON.parse(str);
//       } catch (e) {
//         return errorRender(res, '解析远程JSON数据错误', str);
//       }

//       //var appid = appIds[index].appid;
//       var ts = createTimeStamp();
//       var nonceStr = createNonceStr();
//       var ticket = resp.ticket;
//       var signature = calcSignature(ticket, nonceStr, ts, url);


//       console.log(signature);

//       // cachedSignatures[url] = {
//       //   nonceStr: nonceStr,
//       //   appid: appid,
//       //   timestamp: ts,
//       //   signature: signature,
//       //   url: url
//       // };

//       // responseWithJson(res, {
//       //   nonceStr: nonceStr,
//       //   timestamp: ts,
//       //   appid: appid,
//       //   signature: signature,
//       //   url: url
//       // });
//     });
//   });
// };



module.exports.index = function * index() {
  this.body = yield render('index');

};



module.exports.mail = function * mail() {

  function randomString(len) {　　
    len = len || 20;　　
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
    var maxPos = $chars.length;　　
    var pwd = '';　　
    for (i = 0; i < len; i++) {　　　　
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
    }　　
    return pwd;
  }
  var codes = randomString(20);
  var query = this.query;
  var data = {}

  var mailList = ["i@55u.me", "i@f2e.it"];
  if (mailList.indexOf(query.mail) == -1) {
    data.msg = "不符合要求";
    this.body = data;
  } else {
    data.mail = query.mail;
    data.name = query.name;
    data.codes = codes;
    yield test.insert(data);
    this.body = data;
  }

};



module.exports.list = function * list() {
  var postList = yield test.find({});
  this.body = yield render('list', {
    posts: postList
  });
};



module.exports.aly = function * aly() {
  this.body = yield render('aly');
};
