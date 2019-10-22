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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(wx.getStorageSync('yes'))
    if (wx.getStorageSync('yes') == 'YES'){
      wx.switchTab({
        url: '../index/index',
      })
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
    wx.request({
      url: 'https://onmylive.com/user/login/login',
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

        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        // prevPage.setData({
        //   address1: [e.detail.value[0].split(",")[0]],
        //   addressid: e.detail.value[0].split(",")[1]
        // })//这里为返回上一页所带的参数
        wx.navigateBack({
          delta: 1,
        })
      },

    })
  },
  getUserInfo: function (e) {
    var that = this;
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
        "avatarUrl": e.detail.userInfo.avatarUrl
      };
      console.log(km);
      console.log(wx.getStorageSync('yes'));
      if (wx.getStorageSync('yes') == 'NO' || wx.getStorageSync('yes') == '') {
        wx.request({
          url: app.globalData.allUrl + 'api/user/add_user',
          data: {
            "openid": wx.getStorageSync('openid'),
            "nickname": e.detail.userInfo.nickName,
            "language": e.detail.userInfo.language,
            "city": e.detail.userInfo.city,
            "province": e.detail.userInfo.province,
            "country": e.detail.userInfo.country,
            "gender": e.detail.userInfo.gender,
            "avatarUrl": e.detail.userInfo.avatarUrl
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
        that.onShow();
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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