var app = require('../../app');
var service = require('./service');
var config = require('../../config');
var sign = require('../../support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var mongoose = require('mongoose');
var db = require('../../config/db').db;
var skuaSchema = mongoose.Schema({
	mail: String,
	name: String,
	codes: String
});

var skuaModel = db.model('skua', skuaSchema);

app.get('/', function*(next) {

	// var data = {}
	// data.mail = "i@55u.me";
	// data.name = "skua";
	// data.codes = "123456";
	// var skuaEntity = new skuaModel(data);
	// skuaEntity.save();


	var signature = yield wxRequired(this);
	this.body = this.template.render('templates/index.html', {
		signature: signature
	});

});

app.get('/list', function*(next) {
	var posts = yield skuaModel.find({});
	this.body = this.template.render('templates/list.html', {
		posts: posts
	});
});

app.get('/pts', function*(next) {
	this.body = this.template.render('templates/pts.html');
});

app.get('/qr', function*(next) {
	this.body = this.template.render('templates/qr.html');
});



app.get('/oauth', function*(next) {
	this.body = this.template.render('templates/oauth.html');
});


app.get('/wxinfo', function*(next) {

	var data = yield service.oauth2Token(this.query.code);
	var userinfo = yield service.userinfo(data.access_token, data.openid);

	this.body = this.template.render('templates/wxinfo.html', {
		userinfo: userinfo
	});
});

app.post('/mail', function*(next) {

	var entity = this.request.body;
	//var entity = form.entity;

	console.log(service.mail)


	var data = yield service.mail(entity);

	console.log("+++++++")

	this.body = this.template.render(200);
});