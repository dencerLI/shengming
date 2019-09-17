// pages/water/water.js
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
    height:0,
    width:0,
    currentTab: 0,
    tclist: [{ "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": 'ddd', "sl": '10袋 + 口贝水机1个', "yes": 'false' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTab: function (e) {
      var that = this;

      if (that.data.currentTab === e.currentTarget.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.currentTarget.dataset.current,
        })
      }
    },
    onLoad:function(){
      this.setData({
        height: wx.getSystemInfoSync().windowHeight + "px",
        width: wx.getSystemInfoSync().windowWidth
      })
    } 
  }
})
