require('./socket');

var Router = require('koa-router');
var config = require('../../config');
var router = module.exports = new Router({
  prefix: '/socket'
});



router.get('/a', function * (next) {
	this.body = this.render('templates/a.html');
});

router.get('/b', function * (next) {
	this.body = this.render('templates/b.html',{
		roomId:this.query.roomId || null
	});
});




