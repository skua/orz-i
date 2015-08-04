var request = require('../../support').request;
var config = require('../../config');


// function randomString(len) {　　
//   len = len || 20;　　
//   var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
//   var maxPos = $chars.length;　　
//   var pwd = '';　　
//   for (i = 0; i < len; i++) {　　　　
//     pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
//   }　　
//   return pwd;
// }



// 获取微信签名所需的access_token
exports.accessToken = function() {
  return request({
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    method: 'get',
    qs: {
      grant_type:"client_credential",
      appid: config.wxconfig.appid,
      secret: config.wxconfig.secret
    }
  });
};

// 获取微信签名所需的ticket
exports.ticket = function(accessToken) {
  return request({
    url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    method: 'get',
    qs: {
      access_token: accessToken,
      type: "jsapi"
    }
  });
};



exports.oauth2Token = function(code) {
  return request({
    url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    method: 'get',
    qs: {
      appid: config.wxconfig.appid,
      secret: config.wxconfig.secret,
      code:code,
      grant_type:"authorization_code"
    }
  });
};


exports.userinfo = function(access_token,openid) {
  return request({
    url: 'https://api.weixin.qq.com/sns/userinfo',
    method: 'get',
    qs: {
      access_token: access_token,
      openid: openid,
      lang:"zh_CN"
    }
  });
};



exports.mail = function(entity) {

  return request({
    url: 'http://api.qdingnet.com/qding-api/api/json/history-order/getOrders',
    method: 'post',
    qs: {
      body: JSON.stringify({
        appDevice: "appDevice",
        accountId: "accountId"
      })
    }
  });


  // var codes = randomString(20);
  // var query = this.query;
  // var data = {}

  // var mailList = ["i@55u.me", "i@f2e.it"];

  // if (mailList.indexOf(query.mail) == -1) {
  //   data.msg = "不符合要求";
  //   this.body = data;
  // }
  // else if(query.name.length > 8){
  //   data.msg = "名字长度不正确";
  //   this.body = data;
  // }
  //  else {
  //   data.mail = query.mail;
  //   data.name = query.name;
  //   data.codes = codes;
  //   var skuaEntity = new skuaModel(data);
  //   skuaEntity.save();
  //   this.body = data;
  // }


};