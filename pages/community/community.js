// pages/community/community.js
const app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ n: 1, title: "张建", shouru: 13338, imgurl: app.globalData.allUrl +"uploads/images/strward/headimg/head_1.png" },
      { n: 2, title: "毛宇", shouru: 8962, imgurl: app.globalData.allUrl + "uploads/images/strward/headimg/head_2.png" },
      { n: 3, title: "刘基", shouru: 7641, imgurl: app.globalData.allUrl +"uploads/images/strward/headimg/head_3.png" },
       ],
    imglist1: app.globalData.allUrl +'uploads/images/shequ/sq_3.png',
    imglist2: app.globalData.allUrl +'uploads/images/shequ/sq_4.png',
    imglist3: app.globalData.allUrl +'uploads/images/shequ/sq_1.png',
    imglist4: app.globalData.allUrl +'uploads/images/shequ/sq_2.png',
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
    appUrl: app.globalData.allUrl,
    isupload: "?" + Math.random() / 9999
  },
  map: function () {
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
  shouquan:function(a,b){
    //添加地址
    wx.showLoading({
      title: '上传地理位置中...'
    });
    wx.request({
      url: app.globalData.allUrl + 'api/user/add_location',
      method: "POST",//指定请求方式，默认get
      data: { "uid": wx.getStorageSync('uid'),"location":a+','+b},
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
  }
  ,
  zhaoshang:function(){
    wx.navigateTo({
      url: '../investment/investment',
    })
  },
  gotem: function () {
    wx.navigateTo({
      url: '../guanjia/guanjia',
    })
  },
  gomap: function () {
    wx.navigateTo({
      url: '../call/call',
    })
  },
  goshouquan:function(){
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
                        duration: 5000
                      })
                      //再次授权，调用getLocationt的API
                      that.map();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.goshouquan();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  ,
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})