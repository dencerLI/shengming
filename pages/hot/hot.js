// pages/hot/hot.js
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
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    zhaoshang: function() {
      wx.navigateTo({
        url: "../investment/investment",
      })
    },
    shuju: function() {
      wx.navigateTo({
        url: "../Exhibition/Exhibition",
      })
    }
  }
})