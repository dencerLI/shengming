// pages/administration/administration.js
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
     yes:'',
    id:'',
    addlist: [],
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange: function (e) {
      console.log(e.detail.value[0].split(",")[0])
      // this.setData({
      //   yes: e.detail.value
      // })
      // return;
      if (e.detail.value[0]!=undefined){
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          address1: [e.detail.value[0].split(",")[0]],
          addressid: e.detail.value[0].split(",")[1]
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    },dizhilist:function(){
      console.log(wx.getStorageSync('uid'))
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/user/gets_address',
        method: "POST",//指定请求方式，默认get
        data: { "userid": wx.getStorageSync('uid')},
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            addlist: res.data.data
           
          })
        }
      });
    },
    onLoad:function(op){
       
    },
    isadd:function(){
      if (app.globalData.aid() == false) {
        return;
      }
      wx.navigateTo({
        url: '../address/address'　　// 页面 B
      })
    },
    onShow:function(){
      let that = this;
      that.dizhilist();
    }
  }
})
