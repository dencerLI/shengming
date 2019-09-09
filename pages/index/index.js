//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    height:0,
    width:0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    "imgUrls": [{
      "url": "../../images/banner1.png"
    }, {
        "url": "../../images/banner3.png"
    }, {
        "url": "../../images/banner1.png"
    }, {
        "url": "../../images/banner1.png"
      }],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 800,
    swiperCurrent: 0,  
  }, swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
 
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    console.log(wx.getSystemInfoSync().windowHeight)
    this.setData({
      height: wx.getSystemInfoSync().windowHeight+"px",
      width: wx.getSystemInfoSync().windowWidth
    })
  },
  banner:function(){
    var that = this;
    wx.request({
      url: app.globalData.allUrl+'api/banner/banner',
      method: "POST",//指定请求方式，默认get
      data: { num: 3 },
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          imgUrls:res.data.data
        })
      }
    });
   
  },
  iscont:function(e){
    console.log(e.currentTarget.dataset.myindex)
    let myindex = e.currentTarget.dataset.myindex;
    wx.navigateTo({
      url: '../content/content?index='+myindex
      //  url: '../logs/logs'
    })
  }
  ,
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function (){
    this.banner();

  }
})
