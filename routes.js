/**
 * Module dependencies.
 */
var parse = require('co-body');
var render = require('./lib/render');

//db 

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');



var koa = require('koa');
var app = module.exports = koa();
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
//console.log(sign('sM4AOVdWfPE4DxkXGEs8VJqSWLLQkyTACRLmRAJ4qPPf7fKHx_BibTiXcqIGgcCdyE47u6Dwau45ZfuNOKysMg', 'http://t.orz-i.com'));
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



module.exports.add = function * add() {
  this.body = yield render('new');
};

/**
 * Show creation form.
 */
module.exports.wx = function * wx() {
  url = 'http://t.orz-i.com' + this.req.url
  wxSign = sign('sM4AOVdWfPE4DxkXGEs8VJqSWLLQkyTACRLmRAJ4qPPf7fKHx_BibTiXcqIGgcCdyE47u6Dwau45ZfuNOKysMg', url);

  this.body = yield render('wx', {
    sign: wxSign
  });


  // app.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx968f0697f984ba93&secret=4ebe9326c709b80b7df7ee4639cd1d2c&code=03166226e7e8eedf90f7f4b3439b161O&grant_type=authorization_code', function(req, res) {

  //   console.log(req);

  // });

  //console.log(url);


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

