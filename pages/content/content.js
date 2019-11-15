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
      console.log(e.currentTarget.dataset.istype)
      let id = e.currentTarget.dataset.id;
      var uid = wx.getStorageSync('uid');
      if (e.currentTarget.dataset.istype==699){
      wx.navigateTo({
        // url: '../shopdetail/shopdetail?id=' + id + '&nuu=yes&zuan=' + e.currentTarget.dataset.istype,
        url: '../order/order?id=' + id + '&table=' + undefined + '&userid=' + uid + '&num=' + 1 + '&zhi=' + 15 + '&zhi1=天然水&ptype=' + 1 + '&mval=' + 0 + '&isval=' + 699 + '&tid=3'
      })
      }else{
        wx.navigateTo({
          // url: '../shopdetail/shopdetail?id=' + id + '&nuu=yes&zuan=' + e.currentTarget.dataset.istype,
          url: '../order/order?id=' + id + '&table=' + undefined + '&userid=' + uid + '&num=' + 1 + '&zhi=' + 15 + '&zhi1=天然水&ptype=' + 1 + '&mval=' + 1 + '&isval=' + 700 + '&tid=3'
        })
      }
    },
    onLoad: function (options) {
      console.log(options.id)
      let that=this;
      that.setData({ myid: options.id})
      that.iscont(options.id);
    }
  }
})
