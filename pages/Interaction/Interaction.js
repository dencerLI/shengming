// pages/Interaction/Interaction.js
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
    datalist: [{ "name": "大萨达所大多", "src": "../../images/tximg/1.png" }, { "name": "大萨达所大多", "src": "../../images/tximg/2.png" }, { "name": "大萨达所大多", "src": "../../images/tximg/3.png" }, { "name": "大萨达所大多", "src": "../../images/tximg/4.png" }, { "name": "大萨达所大多", "src": "../../images/tximg/5.png" }, { "name": "大萨达所大多", "src": "../../images/tximg/6.png" }, { "name": "大萨达所大多", "src": "../../images/tximg/7.png" }, { "name": "大萨达所大多", "src": "../../images/tximg/8.png" }],
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {

    hudong: function () {
      //添加地址
      var that=this;
      wx.showLoading({
        title: '正在加载...'
      });
      wx.request({
        url: app.globalData.allUrl + 'api/my/my_shares',
        method: "POST",//指定请求方式，默认get
        data: { "uid": wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading()

          that.setData({
            datalist: res.data
          })
        }
      });
    },
    fenxiang: function () {
      wx.navigateTo({
        url: '../share/share',
      })
    },
    onShow:function(){
      this.hudong();
    }
  }
})
