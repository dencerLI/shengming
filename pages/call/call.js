// pages/call/call.js
var app = getApp();
var markers = []
// 地图标记点的气泡
var callout = []
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
    latitude: 24.4795100000,
    longitude: 118.0894800000,
    markers: [

    ],
    back: "#000000",
    yes: "yes",
    iswidth: '0%',
    innone: 'none',
    dian: [],
    missblock:'none',
    appUrl: app.globalData.allUrl,
    isupload: "?" + Math.random() / 9999,
    isnote:'',
    isnote1: '',
    currentTab: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTab: function (e) {
      var that = this;
      console.log(e.currentTarget.dataset.current)
      if (that.data.currentTab === e.currentTarget.dataset.current) {
        return false;
      } else {
        if (e.currentTarget.dataset.current==0){
          that.map();
        }
        if (e.currentTarget.dataset.current == 1) {
           that.map1();
        }
        that.setData({
          currentTab: e.currentTarget.dataset.current,
        })
      }
    },
    godizhi:function(e){
      wx.openLocation({
        latitude: e.currentTarget.dataset.lat,
        longitude: e.currentTarget.dataset.lon,
      })
    },
    map: function() {
      var that = this;
      wx.getLocation({
        type: "wgs84",
        success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log(res);
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude

          })
          that.hujiao(res.latitude, res.longitude);
          that.mak(res.latitude, res.longitude);
          that.mak1(res.latitude, res.longitude);
        }
      })
    },
    map1: function () {
      var that = this;
      wx.getLocation({
        type: "wgs84",
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log(res);
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude

          })
          // that.hujiao(res.latitude, res.longitude);
          that.qs(res.latitude, res.longitude);
          that.qs1(res.latitude, res.longitude);
        }
      })
    },
    toaddress: function(e) {
      console.log(e)
      var id = e.markerId
      console.log(id)
      wx.openLocation({
        latitude: this.data.markers[id].latitude,
        longitude: this.data.markers[id].longitude,
      })
      // wx.navigateTo({
      //   url: '/pages/index/index',
      //   success: function (res) { },
      //   fail: function (res) { },
      //   complete: function (res) { },
      // })
    },
    mywidth: function() {
      var m = 100;
      var that = this;
      var hi = 1;

      var ol = hi / m * 100 + '%';
      that.setData({
        iswidth: ol
      })
    },
    goindex: function() {
      wx.switchTab({
        url: '../index/index',
      })
    }, goshare: function () {
      wx.navigateTo({
        url: '../share/share',
      })
    },
    hujiao: function(a, b) { //查看附近呼叫点
      console.log(a + '-' + b)
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/zone/require_times',
        method: "POST", //指定请求方式，默认get
        data: {
          lat: a,
          lon: b
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function(res) {
          console.log(res.data)
          // wx.hideLoading()
          if (res.data.length <= 0) {
            that.setData({
              dian: res.data,
              yes: 'yes',
              missblock:'block'
            })
          } else {
            that.setData({
              dian: res.data,
              yes: 'no',
              missblock: 'none'
            })
          }

        }
      });
    },
    goshouquan: function() {
      var that = this;
      wx.getSetting({
        success: (res) => {
          console.log(res);
          console.log(res.authSetting['scope.userLocation']);
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
            wx.showModal({
              title: '是否授权当前位置',
              content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
              success: function(res) {
                if (res.cancel) {
                  console.info("1授权失败返回数据");
                  wx.showToast({
                    title: '地理位置授权失败，不能领取水票',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                  })
                  that.setData({
                    isno: 'no'
                  })
                } else if (res.confirm) {
                  //village_LBS(that);
                  wx.openSetting({
                    success: function(data) {
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
                        // that.setData({ isno: 'yes' })
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'success',
                          duration: 5000,
                          mask: true
                        })
                        that.setData({
                          isno: 'no'
                        })
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) { //初始化进入
            // village_LBS(that);
            console.log(res);
            that.map();
          } else {
            that.map();
          }
        }
      })
    },
    mak: function(a, b) {
      
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/zone/all_pub_engine',
        method: "POST", //指定请求方式，默认get
        data: {
          lat: a,
          lon: b
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function(res) {
          console.log(res.data)

          if (res.data.length > 0) {

            var hk = [];
            for (var i = 0; i < res.data.length; i++) {
              hk.push({
                id:i,
                eid: res.data[i].eid,
                sid: res.data[i].sid,
                latitude: res.data[i].lat,
                longitude: res.data[i].lon,
            
                callout: {
                  content: res.data[i].name,
                  padding: 10,
                  display: 'ALWAYS',
                  textAlign: 'center'
                }
              })

            }
            console.log(hk)
            that.setData({
              markers: hk
            })
          } else {
            that.setData({
              markers: [{
                latitude: a,
                longitude: b
              }]
            })
          }

        }
      });
    },
    qs: function (a, b) {

      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/zone/all_pub_getwater',
        method: "POST", //指定请求方式，默认get
        data: {
          lat: a,
          lon: b
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)

          if (res.data.length > 0) {

            var hk = [];
            for (var i = 0; i < res.data.length; i++) {
              hk.push({
                id: i,
                eid: res.data[i].eid,
                sid: res.data[i].sid,
                latitude: res.data[i].lat,
                longitude: res.data[i].lon,

                callout: {
                  content: res.data[i].name,
                  padding: 10,
                  display: 'ALWAYS',
                  textAlign: 'center'
                }
              })

            }
            console.log(hk)
            that.setData({
              markers: hk
            })
          } else {
            that.setData({
              markers: [{
                latitude: a,
                longitude: b
              }]
            })
          }

        }
      });
    },
    mak1: function (a, b) {
      console.log(1)
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/zone/nearby',
        method: "POST", //指定请求方式，默认get
        data: {
          lat: a,
          lon: b
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({ isnote: res.data})

        }
      });
    },
    qs1: function (a, b) {
      console.log(1)
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/zone/nearby_getwater',
        method: "POST", //指定请求方式，默认get
        data: {
          lat: a,
          lon: b
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({ isnote1: res.data })

        }
      });
    },
    onShow: function() {
      this.goshouquan();
      this.mywidth();

    },
    applygo: function() {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/zone/create_call',
        method: "POST", //指定请求方式，默认get
        data: {
          uid: wx.getStorageSync('uid'),
          lat: that.data.latitude,
          lon: that.data.longitude,
          title: '新建呼叫点'
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function(res) {
          console.log(res)
          // wx.hideLoading()
          if (res.statusCode == 200) {
            that.setData({
              innone: "block"
            })
          } else {
            that.setData({
              innone: "none"
            });
            wx.showToast({
              title: '创建失败',
              duration: 2000,
              icon: 'none',
              mask: true
            })
          }
        }
      });
    },
    response: function(e) {
      console.log(e.currentTarget.dataset.id)
      var that = this;
      var id = e.currentTarget.dataset.id;
      wx.request({
        url: app.globalData.allUrl + 'api/zone/join_call',
        method: "POST", //指定请求方式，默认get
        data: {
          uid: wx.getStorageSync('uid'),
          times_id: id

        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function(res) {
          console.log(res)
          if (res.statusCode == 200) {
            wx.showToast({
              title: '响应成功',
              duration: 2000,
              icon: 'none',
              mask: true
            })
          } else {
            wx.showToast({
              title: '响应失败',
              duration: 2000,
              icon: 'none',
              mask: true
            })
          }
        }
      });
    }
  }
})