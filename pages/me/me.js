// pages/me/me.js
const app = getApp()
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
   geren:'',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
     zc:function(){
       wx.navigateTo({
         url: '../meAssets/meAssets',
       })
     },
    sp: function () {
      wx.navigateTo({
        url: '../waterTicket/waterTicket',
      })
    },
    xiugai: function () {
      wx.navigateTo({
        url: '../setup/setup',
      })
    },
    dingdan: function () {
      wx.navigateTo({
        url: '../orderall/orderall',
      })
    }, 
    xinxi:function(){
      var that = this;
      console.log(wx.getStorageSync('uid'))
      wx.request({
        url: app.globalData.allUrl + 'api/my/mine',
        method: "POST",//指定请求方式，默认get
        data: { "uid": wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            geren: res.data
          })
        }
      });
    },goshou:function(){
      wx.navigateTo({
        url: '../myindex/myindex',
      })
    },
    onLoad:function(op){
      // this.xinxi();
      console.log(wx.getStorageSync('yes'))
     
    },
    onShow: function (op) {
      // this.denglu();
      this.xinxi();
      
    }
  }
})
