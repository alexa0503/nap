function wxShare(data){
  wx.config({
    debug: false,
    appId: data.appId,
    timestamp: data.timestamp,
    nonceStr: data.nonceStr,
    signature: data.signature,
    jsApiList: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage'
    ]
  });
  wx.ready(function () {
    wx.onMenuShareAppMessage({
      title: data.shareTitle,
      desc: data.shareDesc,
      link: data.shareUrl,
      imgUrl: data.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
      },
      cancel: function (res) {
      },
      fail: function (res) {
      }
    });
    wx.onMenuShareTimeline({
      title: data.shareDesc,
      desc: data.shareDesc,
      link: data.shareUrl,
      imgUrl: data.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
      },
      cancel: function (res) {
      },
      fail: function (res) {
      }
    });
  });
}
