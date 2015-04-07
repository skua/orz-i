<!doctype html>

<?php
require_once('wechat_js.php');
$wechat = new Wechat_js(array(
'appId' => 'wx37d3b2dac43a589a',
'appSecret' => 'b54abb6217f417c42a962ac7c7c8c5b6',
'tickJsonPath'=>"wechat_js_cache/jsapi_ticket.json",
'tokenJsonPath'=>"wechat_js_cache/aaccess_token.json"
));
$signPackage = $wechat->GetSignPackage();
?>

<html lang="en">
  <head>
    <title>百度钱包邀请你一起改变支付</title>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi,width=640 user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" href="css/style.css?v=12">
  </head>
  <body>
    <!-- <div class="ioc" style="display: none;"><img src="http://7xicpg.com1.z0.glb.clouddn.com/img/baidu.jpg" /></div> -->
    <div id="musicbox">
      <audio id="music" preload="preload">
        <source src="http://7xifr9.com1.z0.glb.clouddn.com/media/belove.mp3">
      </audio>
    </div>
    <div id="btn_sound"></div>
    <div class="swiper-container container swiper-vertical wrapper-bg">
      <div class="swiper-wrapper">
        <div class="swiper-slide slide-page-1">
          <div class="content-box" id="scene">
            <div class="bg"><img src="http://7xifr9.com1.z0.glb.clouddn.com/img/bg-1.jpg?v=1" /></div>
            <div class="text-box-1">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-1.png" />
            </div>
            <div class="text-box-1-1">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-1-1.png" />
            </div>
            <div class="c-box-1">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/c-1.png" />
            </div>
          </div>
        </div>
        <div class="swiper-slide slide-page-2">
          <div class="content-box" id="scene">
            <div class="bg"><img src="http://7xifr9.com1.z0.glb.clouddn.com/img/bg-2.jpg?v=1" /></div>
            <div class="text-box-2">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-2.png" />
            </div>
            <div class="text-box-2-2">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-2-2.png" />
            </div>
            <div class="c-box-2">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/c-2.png" />
            </div>
          </div>
        </div>
        <div class="swiper-slide slide-page-3">
          <div class="content-box" id="scene">
            <div class="bg"><img src="http://7xifr9.com1.z0.glb.clouddn.com/img/bg-3.jpg?v=1" /></div>
            <div class="text-box-3">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-3.png" />
            </div>
            <div class="text-box-3-3">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-3-3.png" />
            </div>
            <div class="c-box-3">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/c-3.png" />
            </div>
          </div>
        </div>
        <div class="swiper-slide slide-page-4">
          <div class="content-box" id="scene">
            <div class="bg"><img src="http://7xifr9.com1.z0.glb.clouddn.com/img/bg-4.jpg?v=1" /></div>
            <div class="text-box-4">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-4.png" />
            </div>
            <div class="text-box-4-4">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-4-4.png" />
            </div>
            <div class="c-box-4">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/c-4.png" />
            </div>
          </div>
        </div>
        <div class="swiper-slide slide-page-5">
          <div class="content-box" id="scene">
            <div class="bg"><img src="http://7xifr9.com1.z0.glb.clouddn.com/img/bg-5.jpg?v=1" /></div>
            <div class="text-box-5">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-5.png" />
            </div>
            <div class="text-box-5-5">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-5-5.png" />
            </div>
            <div class="c-box-5">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/c-5.png" />
            </div>
          </div>
        </div>
        <div class="swiper-slide slide-page-6">
          <div class="content-box" id="scene">
            <div class="bg"><img src="http://7xifr9.com1.z0.glb.clouddn.com/img/bg-6.jpg?v=1" /></div>
            <div class="text-box-6">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-6.png" />
            </div>
            <div class="text-box-6-6">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-6-6.png" />
            </div>
            <div class="c-box-6">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/c-6.png" />
            </div>
          </div>
        </div>
        <div class="swiper-slide slide-page-7">
          <div class="content-box" id="scene">
            <div class="bg last"><img src="http://7xifr9.com1.z0.glb.clouddn.com/img/bg-7.jpg?v=1" /></div>
            <div class="text-box-7">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-7.png" />
            </div>
            <div class="text-box-7-7">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/text-7-7.png" />
            </div>
            <div class="c-box-7">
              <img src="http://7xifr9.com1.z0.glb.clouddn.com/img/c-7.png" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
      <script src="http://7xicpg.com1.z0.glb.clouddn.com/js/jquery.min.js"></script>
      <script src="http://7xicpg.com1.z0.glb.clouddn.com/js/idangerous.swiper.min.js"></script>
     <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="js/main.js?v=8"></script>
      <script>
      var _ = this,
      href = document.location.href,
      path = href.substr(0, href.lastIndexOf('/')),
      src = 'http://7xicpg.com1.z0.glb.clouddn.com/img/baidu.jpg',
      imgUrl = src,
      lineLink = href,
      descContent = '百度钱包拍照付，改变购物方式',
      shareTitle = '拍照付款  不是儿戏是科技';
      wx.config({
      appId: '<?php echo $signPackage['appId'];?>',
      timestamp: '<?php echo $signPackage['timestamp'];?>',
      nonceStr: '<?php echo $signPackage['nonceStr'];?>',
      signature: '<?php echo $signPackage['signature'];?>',
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
      wx.ready(function () {
      // 在这里调用 API
      // document.querySelector('.cover').onclick = function () {
      // wx.chooseImage({
      // success: function (res) {
      // mySwiper.swipeNext();
      // $(".cover").removeClass("active");
      // $(".cover-btn").removeClass("active");
      // }
      // });
      // };
      
      wx.onMenuShareAppMessage({
          title: shareTitle,
          desc: "百度钱包拍照付，改变购物方式",
          link: lineLink,
          imgUrl: imgUrl,
          trigger: function (res) {
              // alert('用户点击发送给朋友');
          },
          success: function (res) {
              // alert('已分享');
          },
          cancel: function (res) {
              // alert('已取消');
          },
          fail: function (res) {
              alert(JSON.stringify(res));
          }
      });
      wx.onMenuShareTimeline({
          title: "百度钱包拍照付，改变购物方式",
          link: lineLink,
          imgUrl: imgUrl,
          trigger: function (res) {
              // alert('用户点击分享到朋友圈');
          },
          success: function (res) {
              // alert('已分享');
          },
          cancel: function (res) {
              // alert('已取消');
          },
          fail: function (res) {
              alert(JSON.stringify(res));
          }
      });
      // wx.onMenuShareQQ({
      //     title: shareTitle,
      //     desc: descContent,
      //     link: lineLink,
      //     imgUrl: imgUrl,
      //     trigger: function (res) {
      //         // alert('用户点击分享到QQ');
      //     },
      //     complete: function (res) {
      //         // alert(JSON.stringify(res));
      //     },
      //     success: function (res) {
      //         // alert('已分享');
      //     },
      //     cancel: function (res) {
      //         // alert('已取消');
      //     },
      //     fail: function (res) {
      //         alert(JSON.stringify(res));
      //     }
      // });
      // wx.onMenuShareWeibo({
      //     title: shareTitle,
      //     desc: descContent,
      //     link: lineLink,
      //     imgUrl: imgUrl,
      //     trigger: function (res) {
      //         // alert('用户点击分享到微博');
      //     },
      //     complete: function (res) {
      //         // alert(JSON.stringify(res));
      //     },
      //     success: function (res) {
      //         // alert('已分享');
      //     },
      //     cancel: function (res) {
      //         // alert('已取消');
      //     },
      //     fail: function (res) {
      //         alert(JSON.stringify(res));
      //     }
      // });
      });
      </script>
      <script type="text/javascript" src="http://tajs.qq.com/stats?sId=43847137" charset="UTF-8"></script>
 
  </body>
</html>