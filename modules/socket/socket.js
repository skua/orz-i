var app = require('../../app');
var service = require('./service');



app.io.use(function*(next) {
  yield * next;
});


// 用户首次链接
app.io.route('AUser', function*(next, params) {

  console.log(this.socket.id)

  this.emit("SendPCId", this.socket.id);


});



app.io.route('GetMobileId', function*(next, params) {

  this.emit("ScanMobile", "SHE")

});

// 创建房间并加入
app.io.route('makeRoom', function*(next, params) {

  this.join(params);

});

// 定向广播
app.io.route('target', function*(next, params) {

  this.broadcast.to(params).emit('ScanMobile', "msg");

});


// 群体广播
app.io.route('zzz', function*(next, params) {

  this.broadcast.emit('ScanMobile', "HEBE");

});