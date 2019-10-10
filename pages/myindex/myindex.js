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
  getUserInfo: function (e) {
    var that=this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
  
    wx.showToast({
      title: '成功授权',
    })
    if (wx.getStorageSync('yes')=='NO'){
    wx.request({
      url: app.globalData.allUrl+'api/user/add_user',
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
        if (res.data!=""&&res.data!=null&&res.data!=undefined){
          // wx.showToast({
          //    title: '插入成功',
          // })
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
          wx.switchTab({
            url: '../index/index',
          })
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
    }else{

      wx.switchTab({
        url: '../index/index',
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