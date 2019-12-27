// pages/Apply/Apply.js
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
    iscolor: "#E65C10",
    checked3: false,
    back: "#666",
    isnone: "none",
    second: 5,
    name: '',
    phone: '',
    yzm: '',
    extension: '',
    hyzm: '获取验证码',
    secondR: 60,
    myonoff: 'on',
    jishiqi1: '',
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkedTap3: function(e) {
      var checked = this.data.checked3;
      console.log(checked)
      this.setData({
        "checked3": !checked,
      })
      if (checked == true) {
        this.setData({
          back: "#666"
        })
      } else {
        this.setData({
          back: "#FF6406"
        })
      }
    },
    applygo: function() {
      if (app.globalData.aid() == false) {
        return;
      }
      var that = this;
      var checked = this.data.checked3;

      if (checked == true) {
        var name = that.data.name;
        var phone = that.data.phone;
        var yzm = that.data.yzm;
        var extension = that.data.extension;
        console.log(name)
        console.log(that.isNumber(name))
        if (that.isNumber(name) == true) {
          wx.showToast({
            title: '姓名不能为数字',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return;
        }
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
          "name": name,
          "code": extension,
          "vericode": yzm,

        };
        console.log(dataid)
        wx.showLoading({
          title: '校验中...',
          mask: true
        });
        //检验地址
        wx.request({
          url: app.globalData.allUrl + 'api/tool/vali_code',
          method: "POST", //指定请求方式，默认get
          data: {
            "phone": phone,
            "code": yzm,
          },
          header: {
            //默认值'Content-Type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded' //post
          },
          success: function(res) {
            console.log(res.data)
            wx.hideLoading()
            if (res.data.status == '0') { //验证码校验成功执行
              wx.request({
                url: app.globalData.allUrl + 'api/zone/steward_apply',
                method: "POST", //指定请求方式，默认get
                data: {
                  "uid": wx.getStorageSync('uid'),
                  "phone": phone,
                  "name": name,
                  "code": extension,
                  "vericode": yzm,
                },
                header: {
                  //默认值'Content-Type': 'application/json'
                  'content-type': 'application/x-www-form-urlencoded' //post
                },
                success: function(res) {
                  console.log(res.data)
                  // wx.hideLoading()
                  if (res.data.res == "1") {
                    that.setData({
                      isnone: "block"
                    })

                    var miao = setInterval(function() {
                      var second = that.data.second;
                      if (second > 0) {
                        var second1 = second - 1;
                        console.log(second1)
                        that.setData({
                          second: second1
                        })
                      } else {
                        that.goindex();
                        clearInterval(miao);
                      }
                    }, 1000)
                  } else if (res.data.res == "0") {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000,
                      mask: true
                    })
                  }

                }
              });
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
    },
    yzm: function() {
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
      that.data.jishiqi1 = setInterval(function() {
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
        icon:'none',
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
        success: function(res) {
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
    goindex: function() {
      wx.switchTab({
        url: '../index/index'
      })
    },
    isname: function(e) {
      var that = this;
      console.log(e.detail.value)
      if (this.isNumber(e.detail.value) == true) {
        wx.showToast({
          title: '姓名不能为数字',
          icon: 'none',
          duration: 1500
        })
        that.setData({
          name: ''
        })
        return;
      } else {
        that.setData({
          name: e.detail.value
        })
      }
    },
    isphone: function(e) {
      var that = this;
      console.log(e.detail.value)

      that.setData({
        phone: e.detail.value
      })
    },
    isyzm: function(e) {
      var that = this;
      console.log(e.detail.value)

      that.setData({
        yzm: e.detail.value
      })
    },
    isExtension: function(e) {
      var that = this;
      console.log(e.detail.value)

      that.setData({
        extension: e.detail.value
      })
    },
    isNumber: function(val) {
      var  regPos = /^\d+(\.\d+)?$/;  //非负浮点数
      var  regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;      
      } 
      else {
        return false;        
      }    
    },
    validatemobile: function(mobile) {
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
      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
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
    onLoad: function() {

    },
    onUnload() {
      // 页面卸载清除计时器
      var that = this;
      clearInterval(that.data.jishiqi1);
    }
  }
})