// pages/hotarea/hotarea.js
// 地图标记点
var markers = []
// 地图标记点的气泡
var callout = []
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
    latitude: 24.4795100000,
    longitude: 118.0894800000,
    markers: [
      {
        id: 0,
        latitude: 24.4455700000,
        longitude: 118.0824000000,
        // alpha:0,
        callout: {
          content: " 厦门思明区政府 \n 12000元/㎡",
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center',
          // borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }

      },
      {
        id: 1,
        latitude: 24.5131500000,
        longitude: 118.1468600000,
        callout: {
          content: " 厦门湖里区政府 \n 70000元/㎡",
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }

      },
      {
        id: 2,
        latitude: 24.7235700000,
        longitude: 118.1517300000,
        callout: {
          content: " 厦门市同安区政府 \n 100",
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }

      },
      {
        id: 3,
        latitude: 24.5759000000,
        longitude: 118.0972700000,
        callout: {
          content: " 厦门市集美区政府 \n 100",
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }

      },
      {
        id: 4,
        latitude: 24.4846000000,
        longitude: 118.0329300000,
        callout: {
          content: " 厦门市海沧区政府 \n 100",
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }

      },
      {
        id: 5,
        latitude: 24.6196000000,
        longitude: 118.2478900000,
        callout: {
          content: " 厦门市翔安区政府 \n 100",
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }

      },
    ],
    mapWidth: '',
    mapHeight: '',
    appUrl: app.globalData.allUrl

  },

  /**
   * 组件的方法列表
   */
  methods: {
    daohang: function (e) {
      // var name = e.currentTarget.dataset.name;
      var address = '北京市平谷区黄松峪乡黑豆峪村东湖路8号';
      var x = "117.252418";
      var y = "40.213515";

      wx.getLocation({
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          console.log(res.latitude);
          console.log(res.longitude);
          console.log(parseFloat(x));
          console.log(parseFloat(y));
          wx.openLocation({
            latitude: parseFloat(y),
            longitude: parseFloat(x),
            // name: "派途山水放歌",
            // address: "派途山水放歌",
            scale: 28
          })
        }
      })

    },
    toaddress: function (e) {
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
    onLoad: function (options) {
      var sy = wx.getSystemInfoSync(),
        mapWidth = sy.windowWidth * 2,
        mapHeight = sy.windowHeight * 2;
      this.setData({
        mapWidth: mapWidth,
        mapHeight: mapHeight
      })
      // this.distance(117.252418, 40.213515, 117.247926, 40.213515)//测试两坐标距离500m
    },
    distance: function (la1, lo1, la2, lo2) {

      var La1 = la1 * Math.PI / 180.0;

      var La2 = la2 * Math.PI / 180.0;

      var La3 = La1 - La2;

      var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;

      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));

      s = s * 6378.137;//地球半径

      s = Math.round(s * 10000) / 10000;

       console.log("计算结果", s*1000+"m")

      return s

    },
    

  }
})
