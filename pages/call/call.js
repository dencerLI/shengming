// pages/call/call.js
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
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      iconPath: "../../images/icon_cur_position.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    back:"#000000",
    yes:"no",
    iswidth:'0%',
    innone:'none'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    map: function () {
      var that = this;
      wx.getLocation({
        type: "wgs84",
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          //console.log(res.latitude);
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
    },
    mywidth:function(){
      var m=90;
      var that=this;
      var hi=10;

      var ol=hi/m*100+'%';
      that.setData({iswidth:ol})
    },goindex: function () {
      wx.switchTab({
        url: '../index/index',
      })
    },
    onShow: function () {
      this.map();
      this.mywidth();
    },
    applygo:function(){
      this.setData({ innone:"block"})
    }
  }
})
