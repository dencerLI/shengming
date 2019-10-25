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
    imglist: [],
    myid:'',
    appUrl: app.globalData.allUrl
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
    },gomai:function(e){
      console.log(e.currentTarget.dataset.id)
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../shopdetail/shopdetail?id=' + id + '&nuu=yes',
      })
    },
    onLoad: function (options) {
      console.log(options.id)
      let that=this;
      that.setData({ myid: options.id})
      that.iscont(options.id);
    }
  }
})
