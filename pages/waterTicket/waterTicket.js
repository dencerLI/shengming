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
    shui:'',
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      iconPath: "../../images/icon_cur_position.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      isno:'no'
    }],
    appUrl: app.globalData.allUrl,
    isguan:0,
    currentTab: 0,
    second: 30,
    jishiqi:'',
    ks:'',
    tapTime: '',		// 防止两次点击操作间隔太快
  },

  /**
   * 组件的方法列表
   */
  methods: {
    guanjia:function(){
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/tool/get_user_type',
        method: "POST",//指定请求方式，默认get
        data: { 'uid': wx.getStorageSync('uid')},
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          
          that.setData({
            isguan: res.data.type
          })
        }
      });
    },
    clickTab: function (e) {
      var that = this;

      if (that.data.currentTab === e.currentTarget.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.currentTarget.dataset.current,
        })
      }
    },
    towater:function(){
      console.log(wx.getStorageSync('uid'))
      // app.globalData.aid();
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
    goindex:function(){
      wx.switchTab({
        url: '../index/index',
      })
    },
    shiy:function(){
      // app.globalData.aid();
      if (app.globalData.aid()==false){
        return;
      }
      wx.navigateTo({
        url: '../call/call'
      })
    }, fenx: function () {
      if (app.globalData.aid() == false) {
        return;
      }
      wx.navigateTo({
        url: '../share/share'
      })
    },
    shui:function(){
      var that = this;
      var nowTime = new Date();
      if (nowTime - this.data.tapTime < 5000) {
        console.log('阻断')
        return;
      }
      console.log('执行')
      this.setData({ tapTime: nowTime });
     
      // wx.showLoading({
      //   title: "请勿频繁点击",
      //   mask: true,
      //   duration: 5000,
      // });
    
      // wx.showToast({
      //   title: wx.getStorageSync('uid').toString(),
      //   icon: 'none',
      //   duration: 1500,
      //   mask: true
      // })
      console.log("传过来的share_id"+wx.getStorageSync('share_id'));
      if (wx.getStorageSync('uid') == '' || wx.getStorageSync('uid') == null || wx.getStorageSync('uid') == undefined ){
        wx.showToast({
          title: '您还没有登录,马上为您跳转到登录页',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../myindex/myindex?ko=1',
          })
        },2000)
        

      }else{
        if(that.data.isno!='yes'){
          wx.showToast({
            title: '地理位置未授权无法领取水票',
            icon:'none',
            duration: 2000,
            mask: true 
          })
        }
        wx.showLoading({
          title: '领取中...',
          mask: true,
          duration: 5000,
        });
        var hkl = {
          "user_id": wx.getStorageSync('uid'),
          "share_id": wx.getStorageSync('share_id'),
          "location": that.data.longitude + "," + that.data.latitude
        };
        console.log(hkl)
      wx.request({
        url: app.globalData.allUrl + 'api/share/ca_use_ticket',
        method: "POST",//指定请求方式，默认get
        data: {
          "user_id": wx.getStorageSync('uid'),
          "share_id": wx.getStorageSync('share_id'),
          "location": that.data.longitude + "," + that.data.latitude   
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
            that.onShow();
          } else if (res.data.res == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            })
            that.setData({ indis: 'none' })
            that.onShow();
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            })
            that.setData({ indis: 'none' })
            that.onShow();
          }
        
        }
      });

      }
    },
    map: function () {
      var that = this;
      wx.getLocation({
        type: "wgs84",
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log(res);
          console.log(res.longitude);
          // that.shouquan(res.latitude, res.longitude)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            markers: [{
              latitude: res.latitude,
              longitude: res.longitude
            }]
          })

        }
      })
    }, goshouquan: function () {
      var that = this;
      wx.getSetting({
        success: (res) => {
          console.log(res);
          console.log(res.authSetting['scope.userLocation']);
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
            wx.showModal({
              title: '是否授权当前位置',
              content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
              success: function (res) {
                if (res.cancel) {
                  console.info("1授权失败返回数据");
                  wx.showToast({
                    title: '地理位置授权失败，不能领取水票',
                    icon:'none',
                    duration: 2000,
                    mask: true 
                  })
                  that.setData({ isno: 'no'})
                } else if (res.confirm) {
                  //village_LBS(that);
                  wx.openSetting({
                    success: function (data) {
                      console.log(data);
                      if (data.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 5000,
                          mask: true 
                        })
                        //再次授权，调用getLocationt的API
                        that.map();
                        that.setData({ isno: 'yes' })
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'success',
                          duration: 5000,
                          mask: true 
                        })
                        that.setData({ isno: 'no' })
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
            // village_LBS(that);
            that.map();
          } else {
            that.map();
          }
        }
      })
    }
    ,
    onLoad:function(op){
      var that=this;
      console.log(op) 
      if (op.uid != '' && op.uid != null && op.uid != undefined && op.uid != "null" && op.uid != "undefined"){
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
      }else{
        var scene = decodeURIComponent(op.scene)
        console.log("scene"+scene)
        if (scene != '' && scene != null && scene != "null" && scene != undefined && scene != "undefined"){
        console.log(scene)
        console.log(scene.split('=')[1])
        that.setData({ share_id: scene.split('=')[1], indis: 'block'})
          wx.setStorageSync('share_id', scene.split('=')[1]);
          // console.log(wx.getStorageSync('share_id'));
        console.log(555)
        }else{

        }
      }
    },
    onShow:function(){
      var that=this;
      this.goshouquan();
      this.towater();
      this.guanjia();
     
    },
    onReady:function(){
      
    }
  }
})
