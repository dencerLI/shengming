// pages/water/water.js
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
    height:0,
    width:0,
    currentTab: 0,
    tclist: [{ "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": 'ddd', "sl": '10袋 + 口贝水机1个', "yes": 'false' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }, { "name": '天然苏打水（软包装）5000毫升', "sl": '10袋 + 口贝水机1个', "yes": 'true' }],
    shui:''
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
    },shui:function(k){
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/banner/gets_active',
        method: "POST",//指定请求方式，默认get
        data: {"price":k},
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
    gomai:function(e){
      console.log(e.currentTarget.dataset.id)
      var id = e.currentTarget.dataset.id;
      // wx.navigateTo({
      //   url: '../shopdetail/shopdetail?id=' + id + '&nuu=yes',
      // })
      var uid = wx.getStorageSync('uid');
      if (id==1) {
        wx.navigateTo({
          // url: '../shopdetail/shopdetail?id=' + id + '&nuu=yes&zuan=' + e.currentTarget.dataset.istype,
          url: '../order/order?id=' + id + '&table=' + undefined + '&userid=' + uid + '&num=' + 1 + '&zhi=' + 15 + '&zhi1=天然水&ptype=' + 1 + '&mval=' + 0 + '&isval=' + 699 + '&tid=3'
        })
      } else if (id == 2){
        wx.navigateTo({
          // url: '../shopdetail/shopdetail?id=' + id + '&nuu=yes&zuan=' + e.currentTarget.dataset.istype,
          url: '../order/order?id=' + id + '&table=' + undefined + '&userid=' + uid + '&num=' + 1 + '&zhi=' + 15 + '&zhi1=天然水&ptype=' + 9 + '&mval=' + 0 + '&isval=' + 99 + '&tid=5'
        })
      } else if (id == 3) {
        wx.navigateTo({
          // url: '../shopdetail/shopdetail?id=' + id + '&nuu=yes&zuan=' + e.currentTarget.dataset.istype,
          url: '../order/order?id=' + id + '&table=' + undefined + '&userid=' + uid + '&num=' + 1 + '&zhi=' + 15 + '&zhi1=天然水&ptype=' + 1 + '&mval=' + 0 + '&isval=' + 699 + '&tid=4'
        })
      }
    },
    onLoad:function(){
      this.setData({
        height: wx.getSystemInfoSync().windowHeight + "px",
        width: wx.getSystemInfoSync().windowWidth
      })
    },
    onShow: function () {
      this.shui('')
    }
  }
})
