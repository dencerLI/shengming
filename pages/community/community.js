// pages/community/community.js
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{n:1, title: "周大福", shouru: 13338, imgurl:"http://47.105.112.194/uploads/images/strward/headimg/head_1.png" },
      { n: 2,title: "马化腾", shouru: 8962, imgurl: "http://47.105.112.194/uploads/images/strward/headimg/head_2.png" },
      { n: 3,title: "丁三石", shouru: 7641, imgurl: "http://47.105.112.194/uploads/images/strward/headimg/head_3.png" },
       ],
    imglist1:'http://47.105.112.194/uploads/images/shequ/sq_3.png',
    imglist2: 'http://47.105.112.194/uploads/images/shequ/sq_4.png',
    imglist3: 'http://47.105.112.194/uploads/images/shequ/sq_1.png',
    imglist4: 'http://47.105.112.194/uploads/images/shequ/sq_2.png',
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      iconPath: "../../images/icon_cur_position.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }]
  },
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
  zhaoshang:function(){
    wx.navigateTo({
      url: '../investment/investment',
    })
  },
  gotem: function () {
    wx.navigateTo({
      url: '../guanjia/guanjia',
    })
  },
  gomap: function () {
    wx.navigateTo({
      url: '../call/call',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.map();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  ,
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})