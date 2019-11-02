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
    appUrl: app.globalData.allUrl,
    isupload: "?" + Math.random() / 9999
  },

  /**
   * 组件的方法列表
   */
  methods: {

    popConfirm: function () {
      wx.showModal({
        title: '建议电脑端手机验证登录',
        content: 'http://47.105.112.194:8005/admin.html',
        success: function (res) {
          if (res.confirm) {
            console.log('点击确认回调')
          } else {
            console.log('点击取消回调')
          }
        }
      })
    },
     zc:function(){
       wx.navigateTo({
         url: '../meAssets/meAssets',
       })
     },
    sp: function () {
      wx.navigateTo({
        url: '../waterTicket/waterTicket',
      })
    },lingshui: function () {
      wx.navigateTo({
        url: '../sweepcode1/sweepcode1',
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
