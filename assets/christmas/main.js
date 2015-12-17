var audio = document.getElementById("music");
var noMusic = true;
var isFirst = true;

function playMusic() {
  $("#btn_sound").addClass("beplay");
  audio.play();
};

function pauseMusic() {
  $("#btn_sound").removeClass("beplay");
  audio.pause();
};
setTimeout("playMusic()", 1000);
$("#btn_sound").click(function(event) {
  if (!!audio.paused) {
    playMusic();
    noMusic = true;
  } else {
    pauseMusic();
    noMusic = false;
  }
});



// share 1:A题，2：A答案，3：B题，4：B答案

var list = [];
var charUrl = ""

imgUrl = 'http://cdn.orz-i.com/yzfr/image/200-200.jpg',

  descContent = '这些看似毫不相关的节日，其实都有一个共同点',
  shareTitle = '这些节日之间，隐藏的关系是……';


wx.config({
  debug: true,
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


$(".q-btn").click(function(event) {
  $(this).parents(".q-box").removeClass("active");
  if ($(this).parents(".q-box").next().length > 0) {
    $(this).parents(".q-box").next().addClass("active");
    list.push($(this).attr("data-id"));
    console.log(list);
  } else {
    list.push($(this).attr("data-id"));
    $(".q-box-out").hide();
    $(".last").show();



    for (i = 0; i < list.length; i++) {
      charUrl = charUrl + "q" + (i + 1) + "=" + list[i] + "&"
    }
    charUrl = charUrl + "share=2"

    console.log(charUrl);


    wx.ready(function() {
      // 在这里调用 API
      wx.onMenuShareAppMessage({
        title: shareTitle,
        desc: descContent,
        link: "http://io.orz-i.com/case/christmasboy?" + charUrl,
        imgUrl: imgUrl
      });
      wx.onMenuShareTimeline({
        title: shareTitle,
        link: "http://io.orz-i.com/case/christmasboy?"+ charUrl,
        imgUrl: imgUrl
      });
      wx.onMenuShareQQ({
        title: shareTitle,
        desc: descContent,
        link: "http://io.orz-i.com/case/christmasboy?" + charUrl,
        imgUrl: imgUrl
      });
    });


  }



});

$(".btn-boy").click(function(event) {
  $(".change").hide();
  $(".q-box-out").show();
  $(".boy-box").show();

});

$(".btn-girl").click(function(event) {
  $(".change").hide();
  $(".q-box-out").show();
  $(".girl-box").show();

});


$(".home-btn").click(function(event) {
  $(".change").show();
  $(".home").hide();

});