
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var app = module.exports = koa();

  
app.use(logger());

// route middleware
var routes = require('./routes.js');


var host = "http://55u.me";


//var sign = require('./lib/sign.js');

//console.log(sign('jsapi_ticket', 'http://example.com'));
/*
 *something like this
 *{
 *  jsapi_ticket: 'jsapi_ticket',
 *  nonceStr: '82zklqj7ycoywrk',
 *  timestamp: '1415171822',
 *  url: 'http://example.com',
 *  signature: '1316ed92e0827786cfda3ae355f33760c4f70c1f'
 *}
 */




app.use(route.get('/', routes.index));
app.use(route.get('/post/list', routes.list));
app.use(route.get('/post/new', routes.add));
app.use(route.post('/post', routes.create));
app.use(route.get('/post/show/:id', routes.show));

app.use(route.get('/post/wx', routes.wx));

//app.use(route.get('/weixinapi',routes.weixinapi));
 
app.listen(3443);

console.log("连接成功！");

