// pages/guanjia/guanjia.js
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
    mydata:'',
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
      tplist:function(){
        var that = this;
        wx.request({
          url: app.globalData.allUrl + 'api/tool/strward_detail',
          method: "POST", //指定请求方式，默认get
          data: '',
          header: {
            //默认值'Content-Type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded' //post
          },
          success: function (res) {
            console.log(res.data)
            that.setData({ mydata:res.data})
          }
        });
      },
      goapp:function(){
        if (app.globalData.aid() == false) {
          return;
        }
          wx.navigateTo({
            url: '../Apply/Apply',
       })
      },
      onReady:function(){
        this.tplist();
      }
  }
})
