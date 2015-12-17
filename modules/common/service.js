var request = require('../../support').request;
var config = require('../../config');

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

// 通用代理
exports.proxyRequest = function (options) {
  return request(options, false);
};