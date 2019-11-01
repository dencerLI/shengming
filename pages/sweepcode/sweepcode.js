// pages/sweepcode/sweepcode.js
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
    phone: '',
    yzm: '',
    secondR: 60,
    hyzm: '获取验证码',
    myonoff: 'on',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isphone: function (e) {
      var that = this;
      console.log(e.detail.value)

      that.setData({
        phone: e.detail.value
      })
    },
    isyzm: function (e) {
      var that = this;
      console.log(e.detail.value)

      that.setData({
        yzm: e.detail.value
      })
    },
    isNumber: function (val) {
      var regPos = /^\d+(\.\d+)?$/;  //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      }
      else {
        return false;
      }
    },
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
    yzm: function () {
      if (app.globalData.aid() == false) {
        return;
      }
      var that = this;
      if (that.data.myonoff == "off") {
        return;
      }
      var phone = that.data.phone;
      if (that.validatemobile(phone) == false) {
        return;
      }
      that.data.jishiqi1 = setInterval(function () {
        var second = that.data.secondR;
        if (second > 0) {
          var second1 = second - 1;
          console.log(second1)
          that.setData({
            secondR: second1,
            myonoff: 'off',
            hyzm: second1 + 's'
          })
        } else {
          that.setData({
            hyzm: '获取验证码',
            myonoff: 'on',
          })
          clearInterval(that.data.jishiqi1);
        }
      }, 1000)

      wx.showLoading({
        title: '加载中...',
        icon: 'none',
        mask: true
      });
      //添加地址
      wx.request({
        url: app.globalData.allUrl + 'api/tool/send_msg',
        method: "POST", //指定请求方式，默认get
        data: {

          "phone": phone,
          "remark": 1,

        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading()
          if (res.data.status == '0') {
            wx.showToast({
              title: '获取验证码成功',
              icon: 'none',
              duration: 1500,
              mask: true
            })


          }
          // that.setData({
          //   addlist: res.data.data
          // })
        }
      });
    },
    applygo: function () {
      if (app.globalData.aid() == false) {
        return;
      }
      var that = this;
        var phone = that.data.phone;
        var yzm = that.data.yzm;
       
        if (that.validatemobile(phone) == false) {
          wx.showToast({
            title: '手机号不正确',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          that.setData({
            phone: ''
          })
          return;
        }

        var dataid = {
          "uid": wx.getStorageSync('uid'),
          "phone": phone,
          "code": yzm,
        };
        console.log(dataid)
        wx.showLoading({
          title: '校验中...',
          mask: true
        });
        //检验地址
        wx.request({
          url: app.globalData.allUrl + 'api/user/ins_phone',
          method: "POST", //指定请求方式，默认get
          data: dataid,
          header: {
            //默认值'Content-Type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded' //post
          },
          success: function (res) {
            console.log(res)
            wx.hideLoading()
            if (res.data.update.status == '0') { //验证码校验成功执行
              wx.showToast({
                title: res.data.update.msg,
                icon: 'none',
                duration: 1500,
                mask: true
              })
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];
              // prevPage.setData({
              //   address1: [e.detail.value[0].split(",")[0]],
              //   addressid: e.detail.value[0].split(",")[1]
              // })//这里为返回上一页所带的参数
              wx.navigateBack({
                delta: 1,
              })

            } else {
              wx.showToast({
                title: '验证码不正确',
                icon: 'none',
                duration: 1500,
                mask: true
              })
            }

          }
        });

      
    }
  }
})
