// $(function() {
//   var socket = io({
//     transports: ['websocket'],
//     timestampRequests: true,
//   });
//   // //var socket = io.connect("http://127.0.0.1:3443");

//   // // Whenever the server emits 'typing', show the typing message
//   // socket.on('typing', function(data) {
//   //   console.log(data);
//   // });

//   // // socket.on('auction', function(data) {
//   // //   console.log(data);
//   // //   // 更新积分
//   // // });


//   // $(".btn").on('click', function(e) {

//   //   socket.emit('auction', {
//   //     hello: 'world'
//   //   });

//   // });

// socket.emit("MobileToPC","Data From mobile!");
// socket.on("ReceiveDataToMobile",function(data){
//   console.log(data)
// })
// socket.on("disconnect", function(){
//   alert("链接断开,请刷新页面!")
//  });




// });