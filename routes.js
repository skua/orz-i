/**
 * Module dependencies.
 */
var parse = require('co-body');
var render = require('./lib/render');



//db 

// Set up monk
//var monk = require('monk');
//var wrap = require('co-monk');
//var db = monk('localhost/koaBlog');

// Wrap monk in generator goodness
//var posts = wrap(db.get('posts'));


var sign = require('./lib/sign.js');

//console.log(sign('jsapi_ticket', 'http://example.com'));




// And now... the route definitions
/**
 * Post listing.
 */
// module.exports.list = function *list() {
//   //var postList = yield posts.find({});
//   this.body = yield render('list', { posts: "hebe" });
// };

module.exports.index = function *index() {
  this.body = yield render('index');
};

module.exports.list = function *list() {
  this.body = yield render('list');
};

module.exports.weixinapi = function *weixinapi() {
//var wx_config={debug:false,appId:'wx5d35652f96506a51',timestamp:1428375278,nonceStr:'kXHcVKQiR7GRtdoDtx',signature: 'd17ca4ab1d97ed9d556d94039d798179260150f8'};
  var wx_sign = sign('sM4AOVdWfPE4DxkXGEs8VF5kYx3BiX1JlFvmHFJiZSEdEU2KjnAldDihoCtf-VbVbiBZgd-WQGYO3Mi_TQVV7A', 'http://t.orz-i.com/');
  var wx_config = "var wx_config= {debug:true," +
                  "appId:'wx37d3b2dac43a589a',timestamp:"+
                   wx_sign.timestamp + 
                   ",nonceStr:'"+
                   wx_sign.nonceStr + 
                   "',signature: '"+
                   wx_sign.signature + 
                   "'};"
  this.body = wx_config;
};