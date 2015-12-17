var Router = require('koa-router');
var router = module.exports = new Router();
var service = require('./service');
var config = require('../../config');
var sign = require('../../support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

 

// 七夕

router.get('/case/magpie/make', function * (next) {
	var signature = yield wxRequired(this);
	var data = {
		signature: signature
	}
	this.body = this.render('templates/theme-make.html', data);
});

router.get('/case/magpie/theme/:id', function * (next) {
	var signature = yield wxRequired(this);
	if ( !! this.query.boy && this.query.boy.length > 4) {
		this.query.boy = this.query.boy.substr(0, 4);
	}
	if ( !! this.query.boy && this.query.girl.length > 4) {
		this.query.girl = this.query.girl.substr(0, 4);
	}
	var data = {
		boy: this.query.boy || "男孩纸",
		girl: this.query.girl || "女孩纸",
		signature: signature
	}
	if (this.params.id == 1) {
		this.body = this.render('templates/theme-1.html', data);
	} else if (this.params.id == 2) {
		this.body = this.render('templates/theme-2.html', data);
	} else if (this.params.id == 3) {
		this.body = this.render('templates/theme-3.html', data);
	} else if (this.params.id == 4) {
		this.body = this.render('templates/theme-4.html', data);
	} else if (this.params.id == 5) {
		this.body = this.render('templates/theme-5.html', data);
	} else {
		this.body = this.render('templates/theme-1.html', data);
	}
});
