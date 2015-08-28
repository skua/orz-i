var app = require('../../app');
var service = require('./service');
var config = require('../../config');
var sign = require('../../support/sign');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var qiniu = require('qiniu');

var mongoose = require('mongoose');
var db = require('../../config/db').db;
var skuaSchema = mongoose.Schema({
	mail: String,
	name: String,
	codes: String
});


var wxinfoSchema = mongoose.Schema({
	openid: String,
	nickname: String,
	headimgurl: String
});

var skuaModel = db.model('skua', skuaSchema);
var wxinfoModel = db.model('wxinfo', wxinfoSchema);


app.get('/', function*(next) {
	var signature = yield wxRequired(this);
	this.body = this.template.render('templates/index.html', {
		signature: signature
	});
});

app.get('/list', function*(next) {
	var posts = yield wxinfoModel.find({});
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
	var data = {};
	data = yield userinfo;
	var userinfoEntity = new wxinfoModel(data);
	userinfoEntity.save();
	this.body = this.template.render('templates/wxinfo.html', {
		userinfo: userinfo
	});
});





qiniu.conf.ACCESS_KEY = config.qn.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qn.SECRET_KEY;



var uptoken = new qiniu.rs.PutPolicy(config.qn.Bucket_Name);

app.get('/uptoken', function*(next) {
    var token = uptoken.token();
    this.body = this.template.render(200, token);
    console.log(token);
});


app.get('/upimg', function*(next) {
	this.body = this.template.render('templates/upimg.html',{
        domain: config.qn.Domain,
        uptoken_url: config.qn.Uptoken_Url	
	});
});

app.get('/tinyimg', function*(next) {
	this.body = this.template.render('templates/tiny-upload.html',{
        domain: config.qn.Domain,
        uptoken_url: config.qn.Uptoken_Url	
	});
});





