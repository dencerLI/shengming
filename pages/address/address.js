// pages/address/address.js
var tcity = require("../../utils/citys.js");

var app = getApp()
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
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    iscolor:"#999",
    myname:'',
    myphone:'',
    myjie:'',
    myyzm: '',
    onoff:'off'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange: function (e) {
      //console.log(e);
      var val = e.detail.value
      var t = this.data.values;
      var cityData = this.data.cityData;

      if (val[0] != t[0]) {
        console.log('province no ');
        const citys = [];
        const countys = [];

        for (let i = 0; i < cityData[val[0]].sub.length; i++) {
          citys.push(cityData[val[0]].sub[i].name)
        }
        for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
          countys.push(cityData[val[0]].sub[0].sub[i].name)
        }

        this.setData({
          province: this.data.provinces[val[0]],
          city: cityData[val[0]].sub[0].name,
          citys: citys,
          county: cityData[val[0]].sub[0].sub[0].name,
          countys: countys,
          values: val,
          value: [val[0], 0, 0]
        })

        return;
      }
      if (val[1] != t[1]) {
        console.log('city no');
        const countys = [];

        for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
          countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
        }

        this.setData({
          city: this.data.citys[val[1]],
          county: cityData[val[0]].sub[val[1]].sub[0].name,
          countys: countys,
          values: val,
          value: [val[0], val[1], 0]
        })
        return;
      }
      if (val[2] != t[2]) {
        console.log('county no');
        this.setData({
          county: this.data.countys[val[2]],
          values: val
        })
        return;
      }


    },
    open: function () {
      this.setData({
        condition: !this.data.condition
      })
    },
    onLoad: function () {
      console.log("onLoad");
      var that = this;

      tcity.init(that);

      var cityData = that.data.cityData;


      const provinces = [];
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData.length; i++) {
        provinces.push(cityData[i].name);
      }
      console.log('省份完成');
      for (let i = 0; i < cityData[0].sub.length; i++) {
        citys.push(cityData[0].sub[i].name)
      }
      console.log('city完成');
      for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
        countys.push(cityData[0].sub[0].sub[i].name)
      }

      that.setData({
        'provinces': provinces,
        'citys': citys,
        'countys': countys,
        'province': cityData[0].name,
        'city': cityData[0].sub[0].name,
        'county': cityData[0].sub[0].sub[0].name
      })
      console.log('初始化完成');


    },
    isname:function(e){
      console.log(e.detail.value)
      if(this.isNumber(e.detail.value)==true){
        wx.showToast({
          title: '姓名不能为数字',
          icon: 'none',
          duration: 1500
        })
        return;
      }
      this.setData({ myname: e.detail.value})
      console.log(this.data.myname + '--' + this.data.myphone + '--' + this.data.myjie)
      if (this.data.myname != '' && this.data.myphone != '' && this.data.myjie != '' && this.data.myyzm != '' ){
        this.setData({iscolor:'#333',onoff:'on'})
      }else{
        this.setData({ iscolor: '#999', onoff: 'off' })
      }
    },
    isphone: function (e) {
      console.log(e.detail.value)
      this.setData({ myphone: e.detail.value })
      console.log(this.data.myname + '--' + this.data.myphone + '--' + this.data.myjie)
      if (this.data.myname != '' && this.data.myphone != '' && this.data.myjie != '' && this.data.myyzm != '' ) {
        this.setData({ iscolor: '#333', onoff: 'on' })
      } else {
        this.setData({ iscolor: '#999', onoff: 'off' })
      }
    },
    isjie: function (e) {
      console.log(e.detail.value)
      this.setData({ myjie: e.detail.value })
      console.log(this.data.myname + '--' + this.data.myphone + '--' + this.data.myjie)
      if (this.data.myname != '' && this.data.myphone != '' && this.data.myjie != '' && this.data.myyzm != '' ) {
        this.setData({ iscolor: '#333', onoff: 'on' })
      } else {
        this.setData({ iscolor: '#999', onoff: 'off' })
      }
    },isyzm: function (e) {
      console.log(e.detail.value)
      this.setData({ myyzm: e.detail.value })
      console.log(this.data.myname + '--' + this.data.myphone + '--' + this.data.myjie)
      if (this.data.myname != '' && this.data.myphone != '' && this.data.myjie != '' && this.data.myyzm != '') {
        this.setData({ iscolor: '#333', onoff: 'on' })
      } else {
        this.setData({ iscolor: '#999', onoff: 'off' })
      }
    },  isNumber: function(val) {

          var regPos = /^\d+(\.\d+)?$/; //非负浮点数

          var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数

          if(regPos.test(val) || regNeg.test(val)) {

          return  true;

        } else  {

          return  false;

        }

    }
,
    validatemobile: function (mobile) {
      if (mobile.length == 0) {
        wx.showToast({
          title: '请输入手机号！',
          icon: 'none',
          duration: 1500,
          mask: true 
        })
        return false;
      }
      if (mobile.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none',
          duration: 1500,
          mask: true 
        })
        return false;
      }
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(mobile)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'none',
          duration: 1500,
          mask: true 
        })
        return false;
      }
      return true;
    },
    address:function(e){
      console.log(e)
      if (e.currentTarget.dataset.val=="off"){
        return;
      }
      var that=this;
      var name=that.data.myname;
      var phone = that.data.myphone;
      var jie = that.data.myjie;
      var yzm = that.data.myyzm;
      var province = that.data.province;
      var city = that.data.city;
      var county = that.data.county;

      if (that.isNumber(name) == true) {
        wx.showToast({
          title: '姓名不能为数字',
          icon: 'none',
          duration: 1500,
          mask: true 
        })
        return;
      }
      if (that.validatemobile(phone)==false){
         return;
      }
      if(yzm!='1111'){
        wx.showToast({
          title: '验证码不正确',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        return;
      }

      if (jie=='') {
        wx.showToast({
          title: '请填写具体门牌号地址',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        return;
      }
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      //添加地址
      wx.request({
        url: app.globalData.allUrl + 'api/user/add_address',
        method: "POST",//指定请求方式，默认get
        data: { 
          "userid": wx.getStorageSync('uid'),
          "phone":phone, 
          "province": province,
          "city": city,
          "area": county,
          "detail_add": jie,
          "get_time": '',
          },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading()
          if(res.data.suc=='查询成功'){
            wx.showToast({
              title: '添加地址成功',
              icon: 'none',
              duration: 1500,
              mask: true
            })
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            // prevPage.setData({
            //   address1: [e.detail.value[0].split(",")[0]],
            //   addressid: e.detail.value[0].split(",")[1]
            // })
            wx.navigateBack({
              delta: 1,
            })
          }
          // that.setData({
          //   addlist: res.data.data
          // })
        }
      });

    }
  }
})
