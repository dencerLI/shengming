// pages/share/share.js
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
     height:0,
    isShowToast:'none',
    tpl: [
      
    ],
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
    indicatorDots: false,
    autoplay: false,
    medata:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShareAppMessage: function () {
      var that=this;
      // console.log(that.data.medata.num)
      // if (that.data.medata.num>=0){
      //   return;
      // }
      return {
        imageUrl: that.data.tpl[that.data.swiperIndex].pic_url,
        title: that.data.tpl[that.data.swiperIndex].title,
        desc: that.data.tpl[that.data.swiperIndex].title,
        path: 'pages/waterTicket/waterTicket?uid=' + wx.getStorageSync('uid'), // 路径，传递参数到指定页面。
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }

      }
    },
    bindchange(e) {
      console.log(e.detail.current)
      this.setData({
        swiperIndex: e.detail.current
      })
    },
    saveToPhone() {
      var that=this;
      var imgSrc = "http://yijiao.oss-cn-qingdao.aliyuncs.com/images/http://tmp/wx1b4e5e756cd48af1.o6zAJsws4grEQvYrWTjBigy-6QaU.0llhudiKSF2V955a1c48350d9328ef064b4d36d12746.jpg"
      wx.downloadFile({
        url: imgSrc,
        success: function (res) {
          console.log(res);
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function (err) {
              console.log(err);
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                console.log("当初用户拒绝，再次发起授权")
                that.setData({ isShowToast:'block'})
              }else{

              }
            },
            complete(res) {
              console.log(res);
            }
          })
        }
      })

    },
    imgall:function(){
      var that = this;
      console.log(wx.getStorageSync('uid'))
      var uid = wx.getStorageSync('uid');
      wx.request({
        url: app.globalData.allUrl + 'api/share/index',
        method: "POST",//指定请求方式，默认get
        data: { "user_id": uid },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            tpl: res.data.tpl,
            medata: res.data.ticket
          })
        }
      });
    },
    onLoad:function(){
      this.imgall();
      this.setData({
        height: wx.getSystemInfoSync().windowHeight + "px",
      
      })
    },onShow:function(){
      var that=this;
      that.setData({ isShowToast: 'none' });
      
    }
   
  }
})
