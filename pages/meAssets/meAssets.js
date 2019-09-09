// pages/meAssets/meAssets.js
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
    }
  }
})
