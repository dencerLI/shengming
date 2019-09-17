// pages/shopdetail/shopdetail.js
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
    imglist:[],
    val:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
     order:function(){
       wx.navigateTo({
         url: '../order/order',
       })
     },
    iscont: function (table,id) {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/goods/get_goods',
        method: "POST",//指定请求方式，默认get
        data: {"table":table, "id": id },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data.data.url)
          that.setData({
            imglist: res.data.data.url
          })
        }
      });
    },
    jia:function(){
      var h=this.data.val;
      this.setData({val:h+1})
    },
    jian:function(){
      var h = this.data.val;
      if(h>1){
      this.setData({ val: h - 1 })
      }else{
        wx.showToast({
          title: '超过最小数量',
        })
      }
    },
    onLoad: function (options) {
      console.log(options.id)
      let that = this;
      that.iscont(options.table,options.id);
    }

  }
})
