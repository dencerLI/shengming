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
    height: 0,
    width: 0,
    currentTab: 0,
    tclist: [{ "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": 'ddd', "sl": '10袋 + 口贝水机1个', "yes": 'false' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }],
    latitude: 24.4795100000,
    longitude: 118.0894800000,
    markers: [

    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    map: function () {
      var that = this;
      wx.getLocation({
        type: "wgs84",
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log(res);
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude

          })
          that.hujiao(res.latitude, res.longitude);
          that.mak(res.latitude, res.longitude);
        }
      })
    },toaddress: function (e) {
      console.log(e)
      var id = e.markerId
      console.log(id)
      wx.openLocation({
        latitude: this.data.markers[id].latitude,
        longitude: this.data.markers[id].longitude,
      })
      // wx.navigateTo({
      //   url: '/pages/index/index',
      //   success: function (res) { },
      //   fail: function (res) { },
      //   complete: function (res) { },
      // })
    },
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
    onLoad: function () {
      this.setData({
        height: wx.getSystemInfoSync().windowHeight + "px",
        width: wx.getSystemInfoSync().windowWidth
      })
    }
  }
})
