// pages/note/note.js
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
    sj:'',
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      iconPath: "../../images/icon_cur_position.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      isno: 'no'
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gomap:function(){
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/location/location_reset',
        method: "POST",//指定请求方式，默认get
        data: { 'wid': that.data.sj, 'lat': that.data.latitude, 'lon': that.data.longitude },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res)
     
          wx.showToast({
            title: res.data.suc,
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      });
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
                    icon: 'none',
                    duration: 2000,
                    mask: true
                  })
                  that.setData({ isno: 'no' })
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
    }, onShow: function () {
      this.goshouquan();
      
    },
    onLoad: function (options) {
      console.log(options)
      var scene = decodeURIComponent(options.scene)
      console.log(scene)
      console.log(scene.split('=')[1])
      this.setData({ sj: scene.split('=')[1] })

    }
  }
})
