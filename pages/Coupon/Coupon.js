// pages/integral/integral.js
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
    shui: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    towater: function () {
      console.log(wx.getStorageSync('uid'))
      // app.globalData.aid();
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/my/cash_detail',
        method: "POST",//指定请求方式，默认get
        data: { 'uid': wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            shui: res.data.data
          })
        }
      });
    },
    onShow: function () {
      this.towater();
    }
  }
})
