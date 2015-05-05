/**
 * Module dependencies.
 */
var parse = require('co-body');
var render = require('./lib/render');

//db 

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');

// 链接mongo
//local 库名
//testData 集合名称

var db = monk('localhost/local');

var testData = wrap(db.get('testData'));
testData.find({}, function(err, docs) {
  //console.log(docs);
})


var sign = require('./lib/sign.js');

//console.log(sign('jsapi_ticket', 'http://example.com'));

// And now... the route definitions
/**
 * Post listing.
 */


module.exports.index = function * index() {
  this.body = yield render('index');
};

module.exports.list = function * list() {

  var limit = 1
  var posts = yield testData.find({});

  // this.body = yield render('list', { posts: postList });
  for (i = 0; i < posts.length; i++) {
    if (posts[i].post_id > limit) {
      var post = posts[i];
      break;
    }
  }
  //if (!post) this.throw(404, 'invalid post id');
  this.body = yield render('list', {
    post: post
  });
  //this.body = yield render('list', { next:postb });
};

/**
 * Show post :id.
 */
module.exports.show = function * show(id) {
  var limit = id;
  var posts = yield testData.find({});
  for (i = 0; i < posts.length; i++) {
    if (posts[i].post_id > limit) {
      var post = posts[i];
      break;
    }
  }
  if (!post) this.
  throw (404, 'invalid post id');
  this.body = yield render('show', {
    post: post
  });
};



/**
 * Show creation form.
 */
module.exports.add = function * add() {
  this.body = yield render('new');
};

/**
 * Create a post.
 */
module.exports.create = function * create() {
  var post = yield parse(this);
  //console.log(this);
  yield testData.insert(post);
  this.redirect('/');
};



module.exports.weixinapi = function * weixinapi() {
  //var wx_config={debug:false,appId:'wx5d35652f96506a51',timestamp:1428375278,nonceStr:'kXHcVKQiR7GRtdoDtx',signature: 'd17ca4ab1d97ed9d556d94039d798179260150f8'};
  var wx_sign = sign('sM4AOVdWfPE4DxkXGEs8VF5kYx3BiX1JlFvmHFJiZSEdEU2KjnAldDihoCtf-VbVbiBZgd-WQGYO3Mi_TQVV7A', 'http://t.orz-i.com/');
  var wx_config = "var wx_config= {debug:true," +
    "appId:'wx37d3b2dac43a589a',timestamp:" +
    wx_sign.timestamp +
    ",nonceStr:'" +
    wx_sign.nonceStr +
    "',signature: '" +
    wx_sign.signature +
    "'};"
  this.body = wx_config;
};