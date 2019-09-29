// pages/waterTicket/waterTicket.js
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
    share_id:'',
    indis:'none',
    shui:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    towater:function(){
      console.log(wx.getStorageSync('uid'))
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/my/my_ticket',
        method: "POST",//指定请求方式，默认get
        data: { 'user_id': wx.getStorageSync('uid'), 'share_id': that.data.share_id },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            shui: res.data
          })
        }
      });
    },
    shiy:function(){
      wx.navigateTo({
        url: '../sweepcode1/sweepcode1'
      })
    }, fenx: function () {
      wx.navigateTo({
        url: '../share/share'
      })
    },
    shui:function(){
      var that=this;
      wx.showToast({
        title: wx.getStorageSync('uid').toString(),
        icon: 'none',
        duration: 1500,
        mask: true
      })
      if (wx.getStorageSync('uid') == '' || wx.getStorageSync('uid') == null || wx.getStorageSync('uid') == undefined ){
        wx.showToast({
          title: '您还没有授权,马上为您跳转到授权页',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../myindex/myindex'　　// 页面 B
          })
        },2000)
        

      }else{
        wx.showLoading({
          title: '领取中...',
          mask: true
        });
      wx.request({
        url: app.globalData.allUrl + 'api/share/ca_use_ticket',
        method: "POST",//指定请求方式，默认get
        data: {
          "user_id": wx.getStorageSync('uid'),
          "share_id": wx.getStorageSync('share_id'),
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading()
          if (res.data.res==1) {
            wx.showToast({
              title: '水票领取成功',
              icon: 'none',
              duration: 1500,
              mask: true
            })
            that.setData({ indis:'none'})
          } else if (res.data.res == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            })
            that.setData({ indis: 'none' })
          }
        
        }
      });

      }
    },
    onLoad:function(op){
      var that=this;
      console.log(op)
      if (JSON.stringify(op) == "{}"){
        console.log(222)
        // this.towater();
      }else{
        that.setData({
          share_id: op.uid,
          indis: 'block'
        })
        wx.setStorageSync('share_id', op.uid)
        console.log(111)
        // this.towater();
      }
    },
    onReady:function(){
      this.towater();
    }
  }
})
