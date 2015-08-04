var mongoose = require('mongoose');
var config = require('./index');
var db = mongoose.createConnection('mongodb://'+config.db.username+":"+config.db.password+"@"+config.db.host+":"+config.db.port+"/"+config.db.collection);
db.on('error', console.error.bind(console, '连接错误:'));


// 对外模型
exports.db = db;