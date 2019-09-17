// pages/content/content.js
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
    imglist: []
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    iscont:function(id){
      var that=this;
      wx.request({
        url: app.globalData.allUrl + 'api/banner/getone_banner',
        method: "POST",//指定请求方式，默认get
        data: { "id": id },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            imglist: res.data.data
          })
        }
      });
    },
    onLoad: function (options) {
      console.log(options.id)
      let that=this;
      that.iscont(options.id);
    }
  }
})
