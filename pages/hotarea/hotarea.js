// pages/hotarea/hotarea.js
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
    listData: [
      {
        "id": 1,
        "placeName": "照金国际滑雪场",
        "placeImageUrl": "",
        "placeOpenTime": 1505854800,
        "placeCloseTime": 1505919600,
        "placeAddress": "照金国际滑雪场",
        "placeLongitude": "108.653665",
        "placeLatitude": "35.067043"
      }, {
        "id": 2,
        "placeName": "竹林畔滑雪场",
        "placeImageUrl": "",
        "placeOpenTime": 1506286800,
        "placeCloseTime": 1506258000,
        "placeAddress": "竹林畔滑雪场",
        "placeLongitude": "109.265771",
        "placeLatitude": "34.013217"
      }, {
        "id": 3,
        "placeName": "西安翠华山滑雪场",
        "placeImageUrl": "",
        "placeOpenTime": 1506200400,
        "placeCloseTime": 1506265200,
        "placeAddress": "西安翠华山滑雪场",
        "placeLongitude": "109.030145",
        "placeLatitude": "33.974409"
      }, {
        "id": 4,
        "placeName": "袁家村九嵕山必捷滑雪场",
        "placeImageUrl": "",
        "placeOpenTime": 1506243600,
        "placeCloseTime": 1506265200,
        "placeAddress": "袁家村九嵕山必捷滑雪场",
        "placeLongitude": "108.532186",
        "placeLatitude": "34.613629"
      }, {
        "id": 5,
        "placeName": "白鹿原滑雪场",
        "placeImageUrl": "",
        "placeOpenTime": 1506286800,
        "placeCloseTime": 1506351600,
        "placeAddress": "西安市灞桥区纺织城南6公里处",
        "placeLongitude": "109.101024",
        "placeLatitude": "34.222726"
      }
    ]
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
    onLoad:function(){
      this.daohang();
    }

  }
})
