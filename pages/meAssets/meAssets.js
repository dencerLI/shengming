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
    moneydata:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gowallet:function(){
      wx.navigateTo({
        url: '../meWallet/meWallet',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    hudong: function () {
      wx.navigateTo({
        url: '../Interaction/Interaction',
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
    },
    onReady:function(){
      this.iscon();
    }
  }
})
