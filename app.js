
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var app = module.exports = koa();

  
app.use(logger());

// route middleware
var routes = require('./routes.js');
app.use(route.get('/', routes.index));
app.use(route.get('/post/list', routes.list));
 
app.listen(3443);

console.log("连接成功！");

