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
    alldata:'',
    val:1,
    dis:'none',
    id:'',
    table:'',
    intlist:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
     order:function(){
       let that=this;
       that.setData({dis:"block"});
       
      //  wx.navigateTo({
      //    url: '../order/order',
      //  })
     },
    isorder: function () {
      let that = this;
      var id=that.data.id;
      var table = that.data.table;
      var uid = wx.getStorageSync('uid');
      var num = that.data.val;
       wx.navigateTo({
         url: '../order/order?id=' + id + '&table=' + table +'&userid='+uid+'&num='+num,
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
          console.log(res.data)
          that.setData({
            alldata: res.data.data,
            id: res.data.data.id,
            table: res.data.data.table,
            intlist: res.data.data
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
      
      that.setData({ id: options.id, table: options.table})
    },
    onShow: function () {

      let that = this;
      that.iscont(that.data.table, that.data.id);
    }

  }
})
