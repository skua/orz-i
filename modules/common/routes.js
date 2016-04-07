var Router = require('koa-router');
var router = module.exports = new Router();
var service = require('./service');
var config = require('../../config');
var sign = require('../../support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');







 

// proxy
router.all(/\/proxy\/(.+)/, function * (next) {
  var data = yield service.proxyRequest({
    url: config.whost + this.path.replace('/proxy', ''),
    method: this.method,
    qs: this.query,
    form: this.request.body
  });
  this.body = data;
});


// time proxy
router.all(/\/proxy-time\/(.+)/, function * (next) {
  var data = yield service.proxyRequest({
    url: config.domain.replace('127.0.0.1:3443', 'www.timemachine.com.cn') + this.path.replace('/proxy-time', ''),
    method: this.method,
    qs: this.query,
    form: this.request.body
  });
  this.body = data.data;
});