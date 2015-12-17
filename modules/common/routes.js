var Router = require('koa-router');
var router = module.exports = new Router();
var service = require('./service');
var config = require('../../config');
var sign = require('../../support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var qiniu = require('qiniu');




router.get('/', function * (next) {
	this.body = this.render('templates/index.html');
});

router.get('/pts', function * (next) {
	this.body = this.render('templates/pts.html');
});

router.get('/qr', function * (next) {
	this.body = this.render('templates/qr.html');
});

router.get('/version', function * (next) {
	this.body = this.render('templates/version.html');
});

qiniu.conf.ACCESS_KEY = config.qn.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qn.SECRET_KEY;



var uptoken = new qiniu.rs.PutPolicy(config.qn.Bucket_Name);

router.get('/uptoken', function * (next) {
	var token = uptoken.token();
	this.body = this.render(200, token);
	console.log(token);
});


router.get('/upimg', function * (next) {
	this.body = this.render('templates/upimg.html', {
		domain: config.qn.Domain,
		uptoken_url: config.qn.Uptoken_Url
	});
});

router.get('/tinyimg', function * (next) {
	this.body = this.render('templates/tiny-upload.html', {
		domain: config.qn.Domain,
		uptoken_url: config.qn.Uptoken_Url
	});
});

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