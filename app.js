var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var app = module.exports = koa();


app.use(logger());

// route middleware
var routes = require('./routes.js');


var host = "http://55u.me";



app.use(route.get('/', routes.index));


app.use(route.get('/list', routes.list));

app.use(route.get('/aly', routes.aly));

app.use(route.get("/mail", routes.mail));


app.listen(3443);

console.log("连接成功！");