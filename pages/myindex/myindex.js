// pages/myindex/myindex.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    appUrl: app.globalData.allUrl,
    ko:'',
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      iconPath: "../../images/icon_cur_position.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      isno: 'no'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(wx.getStorageSync('yes'))
    // if (wx.getStorageSync('yes') == 'YES'){
    //   wx.switchTab({
    //     url: '../index/index',
    //   })
    // }
    console.log(option)
    if (option.ko != '' && option.ko != null && option.ko != undefined){
    this.setData({ ko: option.ko})
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    
  },
   denglu: function () {
    var that = this;
    console.log(wx.getStorageSync('code'))
     console.log(wx.getStorageSync('openid'))
    wx.request({
      url: 'https://shengmingzhili.cn/user/login/login',
      // url: 'http://47.105.112.194/user/login/login',
      data: {
        "openid": wx.getStorageSync('openid'),
        "code": ''
      },
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        console.log(res)
        // wx.setStorageSync('session', res.data.session_key);
        // wx.setStorageSync('openid', res.data.openid);
        wx.setStorageSync('yes', res.data.login);
        wx.setStorageSync('uid', res.data.uid);
        console.log(res.data.uid)

       
       
        if (that.data.ko != '' && that.data.ko != null && that.data.ko != undefined){
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        // prevPage.setData({
        //   address1: [e.detail.value[0].split(",")[0]],
        //   addressid: e.detail.value[0].split(",")[1]
        // })//这里为返回上一页所带的参数
        wx.navigateBack({
          delta: 1,
        })
        }else{
          wx.navigateTo({
            url: '../package/package'
          })
        }
      },

    })
  },
  getUserInfo: function (e) {
    var that = this;
    wx.showLoading({
      title: '载入openid中...',
    })
    if (wx.getStorageSync('openid') != '' && wx.getStorageSync('openid') != null && wx.getStorageSync('openid') != undefined) {

      wx.hideLoading();
    } else {
      console.log(app.globalData.op)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.opCallback = op => {
          if (app.globalData.op == "" || app.globalData.op == null && app.globalData.op == undefined) {
            return;
          } 
      }
    }
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.showToast({
        title: '成功授权',
        icon: 'success',
        duration: 5000,
        mask: true
      })
      var km = {
        "openid": wx.getStorageSync('openid'),
        "nickname": e.detail.userInfo.nickName,
        "language": e.detail.userInfo.language,
        "city": e.detail.userInfo.city,
        "province": e.detail.userInfo.province,
        "country": e.detail.userInfo.country,
        "gender": e.detail.userInfo.gender,
        "avatarUrl": e.detail.userInfo.avatarUrl,
        "location": that.data.latitude + ',' + that.data.longitude
      };
      console.log(km);
      console.log(wx.getStorageSync('yes'));
      if (wx.getStorageSync('yes') == 'NO' || wx.getStorageSync('yes') == '') {
        wx.request({
          url: 'https://shengmingzhili.cn/api/user/add_user',
          // url:'http://47.105.112.194/api/user/add_user',
          data: {
            "openid": wx.getStorageSync('openid'),
            "nickname": e.detail.userInfo.nickName,
            "language": e.detail.userInfo.language,
            "city": e.detail.userInfo.city,
            "province": e.detail.userInfo.province,
            "country": e.detail.userInfo.country,
            "gender": e.detail.userInfo.gender,
            "avatarUrl": e.detail.userInfo.avatarUrl,
            "location": that.data.latitude + ',' + that.data.longitude
          },
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            if (res.data != "" && res.data != null && res.data != undefined) {
              wx.showToast({
                title: '插入成功',
                icon: 'success',
                duration: 5000,
                mask: true
              })

              // that.setData({
              //   userInfo: e.detail.userInfo,
              //   hasUserInfo: true
              // })
              that.denglu();
              

            }
            //mYMaulTwPY1JBjbfyQ+dkA==

          },
          fail: function (err) {
            console.log(err);
            wx.showToast({
              title: '插入失败',
            })
          }

        })
      } else {
        console.log('11');
        that.onLoad();
      }

    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 5000,
        mask: true
      })
    }
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
        // that.shouquan(res.latitude, res.longitude)
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
  }, goshouquan: function () {
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
                wx.showToast({
                  title: '地理位置授权失败，不能领取水票',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
                that.setData({ isno: 'no' })
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
})