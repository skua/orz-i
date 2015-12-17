var Router = require('koa-router');
var router = module.exports = new Router();
var service = require('./service');
var config = require('../../config');
var sign = require('../../support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');



 
router.get('/case/christmasboy', function * (next) {
	var signature = yield wxRequired(this);
	var data = {
		signature: signature
	}
	this.body = this.render('templates/boy.html', data);
});

 
router.get('/case/christmasgirl', function * (next) {
	var signature = yield wxRequired(this);
	var data = {
		signature: signature
	}
	this.body = this.render('templates/girl.html', data);
});