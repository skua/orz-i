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