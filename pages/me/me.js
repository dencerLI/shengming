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
   geren:''
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
    },
    onLoad:function(op){
      // this.xinxi();
    },
    onReady: function (op) {
      this.xinxi();
    }
  }
})
