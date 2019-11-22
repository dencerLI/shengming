// pages/meWallet/meWallet.js
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
    moneydata: '',
    isno:'none',
    end:"none",
    isinput: '',
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    yyue:function(){
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/my/trun_balance ',
        method: "POST",//指定请求方式，默认get
        data: { 'uid': wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res)
          if (res.data.res=='1'){
            wx.showToast({
              title: '成功，' + res.data.msg,
              icon: 'none',
              duration: 5000,
              mask: true
            })
            that.onShow();
          }else{
            wx.showToast({
              title: '失败，' + res.data.msg,
              icon: 'none',
              duration: 5000,
              mask: true
            })
          }
        }
      });
    },
    iscon: function () {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/user/wallet_detail',
        method: "POST",//指定请求方式，默认get
        data: { 'userid': wx.getStorageSync('uid') },
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
    },gocash:function(){
           this.setData({isno:"block"})
    }, gotixian: function () {
      this.setData({ end: "block", isno: "none" })
    },close: function () {
      this.setData({ end: "none" })
    },kong: function () {
     
    }, isphone: function (e) {
      var that = this;
      console.log(e.detail.value)
      // var isinput = that.data.isinput;
      // var k = app.globalData.appnumber(e.detail.value);
      // if (k == false && e.detail.value!=''){
      //   that.setData({
      //     isinput: isinput
      //   })
      // }else{
      that.setData({
        isinput: e.detail.value
      })
      // }
    },ti: function () {
      var that=this;
      var isinput=that.data.isinput;
      var k=app.globalData.appnumber(isinput);
      console.log(k)
      if (k == false || isinput < 2 || isinput > 100){
        wx.showToast({
          title: '提现金额错误',
          icon: 'none',
          duration: 5000,
          mask: true
        })
        return;
      }
      
      console.log({ 'uid': wx.getStorageSync('uid'), 'balance': isinput * 1 * 100 })
      wx.request({
        url: app.globalData.allUrl + 'api/buys/pull_monney',
        method: "POST",//指定请求方式，默认get
        data: { 'uid': wx.getStorageSync('uid'), 'balance': isinput * 1 * 100, 'openid': wx.getStorageSync('openid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res)
          if (res.data.result_code =="SUCCESS"){
            wx.showToast({
              title: '提现成功',
              icon: 'none',
              duration: 5000,
              mask: true
            })
            that.close();
            that.onShow();
          } else if (res.data.result_code == "FAIL"){
            wx.showToast({
              title: res.data.err_code_des,
              icon: 'none',
              duration: 5000,
              mask: true
            })
            that.close();
            that.onShow();
          }else{
            wx.showToast({
              title: '提现失败',
              icon: 'none',
              duration: 5000,
              mask: true
            })
            that.close();
            that.onShow();
          }
          // that.setData({
          //   moneydata: res.data.data
          // })

        }
      });
    },
    onShow: function () {
      this.iscon();
    }
  }
})
