$(function() {

  var socket = io.connect("http://123.57.133.64:3443", {
    transports: ['websocket']
  });
  // var socket = io({
  //   transports: ['websocket'],
  //   timestampRequests: true,
  // });


	var connected = false;
	socket.on("connect", function() {
		console.log('已连接');
		socket.emit("GetMobileId", roomId);

		socket.on("ScanMobile", function(data) { //成功显示操作
			connected = true;
			//
			alert(data)
		});

		var picPlay = function(a) {
			socket.emit("MobileToPC", {
				code: roomId,
				to: a
			})
		};
		socket.on("disconnect", function() {
			alert("close")
		});

	});



	$(".btn").on('click', function(e) {

		socket.emit("makeRoom", roomId);

	});



});