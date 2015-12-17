$(function() {

  var socket = io.connect("http://123.57.133.64:3443", {
    transports: ['websocket']
  });
  // var socket = io({
  //   transports: ['websocket'],
  //   timestampRequests: true,
  // });

  var roomId = null
  var connected = false;


  var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 400,
    height: 400
  });



  socket.on('connect', function() {
    console.log('已连接');
    socket.emit("AUser");


    socket.on("SendPCId", function(data) {
      roomId = data;
      $(".qr").text(data)
      $(".qr").attr("href", "/socket/b?roomId=" + data);

      qrcode.makeCode('http://' + location.host + "/socket/b?roomId=" + data);



    });


    // 定向指令
    $(".btn-b").on('click', function(e) {
      socket.emit("target", {
        roomId: roomId,
        num: numUsers
      });
    })



    $(".btn").on('click', function(e) {
      socket.emit("makeRoom", roomId);
    })


    $(".nm").on('click', function(e) {
      socket.emit("zzz");
    })

    socket.on("disconnect", function() {

      alert("close")

    });



  })

});