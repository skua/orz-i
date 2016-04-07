$(function() {
	var imgUrl = 'https://nzfzaa1v6.qnssl.com/public/logo.jpg';
	var descContent = '哦呦！竟然有人转载了';
	var shareTitle = title;
	var href = document.location.href

	wx.config({
		debug: false,
		appId: appId,
		timestamp: timestamp,
		nonceStr: nonceStr,
		signature: signature,
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'checkJsApi',
			'chooseImage'
			// 所有要调用的 API 都要加到这个列表中
		]
	});

	wx.ready(function() {
		// 在这里调用 API
		wx.onMenuShareAppMessage({
			title: shareTitle,
			desc: descContent,
			link: href,
			imgUrl: imgUrl,
			trigger: function(res) {
				// alert('用户点击发送给朋友');
			},
			success: function(res) {

			},
			cancel: function(res) {
				// alert('已取消');
			},
			fail: function(res) {

			}
		});
		wx.onMenuShareTimeline({
			title: shareTitle,
			link: href,
			imgUrl: imgUrl,
			trigger: function(res) {
				// alert('用户点击发送给朋友');
			},
			success: function(res) {

			},
			cancel: function(res) {
				// alert('已取消');
			},
			fail: function(res) {

			}
		});
		wx.onMenuShareQQ({
			title: shareTitle,
			desc: descContent,
			link: href,
			imgUrl: imgUrl,
			trigger: function(res) {
				// alert('用户点击发送给朋友');
			},
			success: function(res) {

			},
			cancel: function(res) {
				// alert('已取消');
			},
			fail: function(res) {

			}
		});
	});



});