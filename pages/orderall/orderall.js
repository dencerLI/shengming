// pages/orderall/orderall.js
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
    currentTab:0,
    order:0, //订单长度是否为0
    daiorder:1,
    shouorder: 1,
    wanorder: 1,
    meorder:'',
    istype: '',
    appUrl: app.globalData.allUrl,
    tapTime: '',		// 防止两次点击操作间隔太快
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
        // console.log(e.currentTarget.dataset.current)
        that.setData({
          currentTab: e.currentTarget.dataset.current,
        })
        if (e.currentTarget.dataset.current==0){
          that.allorder('');
        }
        if (e.currentTarget.dataset.current == 1) {
          that.allorder('0');
        }
        if (e.currentTarget.dataset.current == 2) {
          that.allorder('1');
        }
        if (e.currentTarget.dataset.current == 3) {
          that.allorder('2');
        }
      
      }
    } ,
    allorder:function(type){
      console.log(type);
      console.log(wx.getStorageSync("uid"))
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/my/my_order',
        method: "POST", //指定请求方式，默认get
        data: { "uid": wx.getStorageSync("uid"), "type": type},
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          if(type==''){
            that.setData({ meorder: res.data, order: res.data.length})
          }
          if (type == '0') {
            that.setData({ meorder: res.data, daiorder: res.data.length })
          }
          if (type == '1') {
            that.setData({ meorder: res.data, shouorder: res.data.length })
          }
          if (type == '2') {
            that.setData({ meorder: res.data, wanorder: res.data.length })
          }
        }
      });
    },goyes:function(e){
      console.log(e.currentTarget.dataset.id)
      var nowTime = new Date();
      if (nowTime - this.data.tapTime < 1000) {
        console.log('阻断')
        return;
      }
      console.log('执行')
      this.setData({ tapTime: nowTime });
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/my/sure_order',
        method: "POST", //指定请求方式，默认get
        data: { "order_id": e.currentTarget.dataset.id },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.res=="1"){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true
          })
            if (that.data.currentTab == 0) {
              that.allorder('');
            }
            if (that.data.currentTab == 1) {
              that.allorder('0');
            }
            if (that.data.currentTab == 2) {
              that.allorder('1');
            }
            if (that.data.currentTab == 3) {
              that.allorder('2');
            }
           
           
          }else{
            wx.showToast({
              title: "确认失败！",
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
        }
      });
    },onLoad:function(op){

    }, onReady: function () {
        var order='';
        this.allorder(order)
    }
  }
})
