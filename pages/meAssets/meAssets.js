// pages/meAssets/meAssets.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    moneydata:'',
    len:0,
    mydata: '',
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    quan: function () {
      if (app.globalData.aid() == false) {
        return;
      }
      wx.navigateTo({
        url: '../Coupon/Coupon',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    gowallet:function(){
      if (app.globalData.aid() == false) {
        return;
      }
      wx.navigateTo({
        url: '../meWallet/meWallet',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    hudong: function () {
      if (app.globalData.aid() == false) {
        return;
      }
      wx.navigateTo({
        url: '../Interaction/Interaction',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    jifen: function () {
      if (app.globalData.aid() == false) {
        return;
      }
      wx.navigateTo({
        url: '../integral/integral',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    iscon:function(){
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/user/wallet_detail',
        method: "POST",//指定请求方式，默认get
        data: {'userid':wx.getStorageSync('uid')},
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            moneydata: res.data.data
          })
        }
      });
    }, hudonglength: function () {
      //添加地址
      var that = this;
      wx.showLoading({
        title: '正在加载...'
      });
      wx.request({
        url: app.globalData.allUrl + 'api/my/my_shares',
        method: "POST",//指定请求方式，默认get
        data: { "uid": wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading()

          that.setData({
            len: res.data.length
          })
        }
      });
    }, zichan: function () {
      //添加地址
      var that = this;
      wx.showLoading({
        title: '正在加载...'
      });
      wx.request({
        url: app.globalData.allUrl + 'api/my/my_res',
        method: "POST",//指定请求方式，默认get
        data: { "uid": wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading()

          that.setData({
            mydata: res.data
          })
        }
      });
    },
    onShow:function(){
      this.iscon();
      this.hudonglength();
      this.zichan();
    }
  }
})
