var Router = require('koa-router');
var router = module.exports = new Router();
var service = require('./service');
var config = require('../../config');
var sign = require('../../support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');



// 钱包app分享
router.get('/case/qbapp', function * (next) {
	var signature = yield wxRequired(this);
	var data = {
		signature: signature
	}
	this.body = this.render('templates/qbapp.html', data);
});


// 钱包app分享
router.get('/case/qbapp/v2', function * (next) {
	var signature = yield wxRequired(this);
	var data = {
		signature: signature
	}
	this.body = this.render('templates/qbapp-v2.html', data);
});

