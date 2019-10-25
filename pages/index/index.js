

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
      id: 1,
      "url": "../../images/banner1.png"
    }, {
        id: 1,
        "url": "../../images/banner3.png"
    }, {
        id: 1,
        "url": "../../images/banner1.png"
    }, {
        id: 1,
        "url": "../../images/banner1.png"
      }],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 800,
    swiperCurrent: 0,  
    datalist:[],
    iscont:'',
    iscont1: '',
    yx:"none",
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      iconPath: "../../images/icon_cur_position.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    appUrl: app.globalData.allUrl
  }, map: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log(res);
        console.log(res.longitude);
        that.shouquan(res.latitude, res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude
          }]
        })

      }
    })
  },
  shouquan: function (a, b) {
    //添加地址
    wx.showLoading({
      title: '上传地理位置中...'
    });
    wx.request({
      url: app.globalData.allUrl + 'api/user/add_location',
      method: "POST",//指定请求方式，默认get
      data: { "uid": wx.getStorageSync('uid'), "location": a + ',' + b },
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()

        // that.setData({
        //   addlist: res.data.data
        // })
      }
    });
  },
  goshouquan: function () {
    var that = this;
    wx.getSetting({
      success: (res) => {
        console.log(res);
        console.log(res.authSetting['scope.userLocation']);
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function (res) {
              if (res.cancel) {
                console.info("1授权失败返回数据");

              } else if (res.confirm) {
                //village_LBS(that);
                wx.openSetting({
                  success: function (data) {
                    console.log(data);
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 5000,
                        mask: true  
                      })
                      //再次授权，调用getLocationt的API
                      that.map();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000,
                        mask: true  
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
          // village_LBS(that);
          that.map();
        } else {
          that.map();
        }
      }
    })
  }, swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  guanbi:function(){
    this.setData({ yx: "none"})
  },
  guanjia:function(){
    wx.navigateTo({
      url: '../package/package'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  lesong:function(){
    var that = this;
    wx.request({
      url: app.globalData.allUrl + 'api/banner/index_left_active',
      method: "POST",//指定请求方式，默认get
      data: '',
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          iscont: res.data.data
        })
      }
    });
  },
  lesong1: function () {
    var that = this;
    wx.request({
      url: app.globalData.allUrl + 'api/banner/index_right_active',
      method: "POST",//指定请求方式，默认get
      data: '',
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          iscont1: res.data.data
        })
      }
    });
  },
  onLoad: function () {
    //  this.getLocation();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(wx.getSystemInfoSync().windowHeight)
    this.setData({
      height: wx.getSystemInfoSync().windowHeight+"px",
      width: wx.getSystemInfoSync().windowWidth
    })
  }, onShow: function () {

    this.goshouquan();
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
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../content/content?id=' + id
      //  url: '../logs/logs'
    })
  },
  tslist: function () {
    var that = this;
    wx.request({
      url: app.globalData.allUrl + 'api/banner/index_goods_list',
      method: "POST",//指定请求方式，默认get
      data:'' ,
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          datalist: res.data.data
        })
      }
    });

  },
  sp: function () {
    wx.navigateTo({
      url: '../waterTicket/waterTicket',
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
    this.tslist();
    this.lesong();
    this.lesong1();
  },
  godetail:function(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var table = e.currentTarget.dataset.table;
    wx.navigateTo({
      url: '../shopdetail/shopdetail?table='+table+'&id='+id,
    })

  },
  godetail1: function (e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '../shopdetail/shopdetail?id=' + id + '&nuu=yes',
    })
  },
  fenxiang: function () {
    wx.navigateTo({
      url: '../share/share',
    })
  },
  dingshui: function () {
    wx.navigateTo({
      url: '../water/water',
    })
  }
})
