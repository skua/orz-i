require('./filter');
var Router = require('koa-router');
var service = require('./service');
var config = require('../../config');
var sign = require('../../support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var commonService = require('../common/service');


var router = module.exports = new Router();


router.get('/', function*(next) {
	var list = yield service.findPublish();
	var signature = yield wxRequired(this);
	this.body = this.render('templates/index.html', {
		list: list,
		signature:signature
	});
});


router.get('/console', function*(next) {

	this.body = this.render('templates/console.html', {
 
	});

});


router.get('/test', function*(next) {
	this.body = this.render('templates/test.html', {
 
	});
});


router.post('/test', function*(next) {
	this.body = this.render(200);
});


router.get('/:post_name', function*(next) {
	var signature = yield wxRequired(this);
	var post_name = encodeURIComponent(this.params.post_name).toLowerCase();
	var kw = post_name;
	if (post_name.indexOf(".html") > -1) {
		kw = post_name.split(".")[0];
	}
	var content = yield service.findContent(kw);
	var GtContent = null;
	var LtContent = null;
	if (content && content.post_date) {
		GtContent = yield service.findPublishByGt(content.post_date);
		LtContent = yield service.findPublishByLt(content.post_date);

	}
	this.body = this.render('templates/page.html', {
		content: content,
		GtContent: GtContent,
		LtContent: LtContent,
		signature:signature
	});
});

