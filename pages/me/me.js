// pages/me/me.js
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
   geren:'',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
     zc:function(){
       wx.navigateTo({
         url: '../meAssets/meAssets',
       })
     },
    sp: function () {
      wx.navigateTo({
        url: '../waterTicket/waterTicket',
      })
    },
    xiugai: function () {
      wx.navigateTo({
        url: '../setup/setup',
      })
    },
    dingdan: function () {
      wx.navigateTo({
        url: '../orderall/orderall',
      })
    }, 
    xinxi:function(){
      var that = this;
      console.log(wx.getStorageSync('uid'))
      wx.request({
        url: app.globalData.allUrl + 'api/my/mine',
        method: "POST",//指定请求方式，默认get
        data: { "uid": wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            geren: res.data
          })
        }
      });
    },denglu:function(){
      var that=this;
      console.log(wx.getStorageSync('code'))
      wx.request({
        url: 'https://onmylive.com/user/login/login',
        data: {
          "openid": wx.getStorageSync('openid'),
          "code":''
        },
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
          console.log(res)
          // wx.setStorageSync('session', res.data.session_key);
          // wx.setStorageSync('openid', res.data.openid);
          wx.setStorageSync('yes', res.data.login);
          wx.setStorageSync('uid', res.data.uid);
          console.log(res.data.uid)
         
          that.onShow();
        },

      })
    },
    getUserInfo: function (e) {
      var that = this;
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      if (e.detail.errMsg == 'getUserInfo:ok') {
        wx.showToast({
          title: '成功授权',
          icon: 'success',
          duration: 5000,
          mask: true
        })
        var km = {
          "openid": wx.getStorageSync('openid'),
          "nickname": e.detail.userInfo.nickName,
          "language": e.detail.userInfo.language,
          "city": e.detail.userInfo.city,
          "province": e.detail.userInfo.province,
          "country": e.detail.userInfo.country,
          "gender": e.detail.userInfo.gender,
          "avatarUrl": e.detail.userInfo.avatarUrl
        };
        console.log(km);
        console.log(wx.getStorageSync('yes'));
        if (wx.getStorageSync('yes') == 'NO' || wx.getStorageSync('yes') == '') {
          wx.request({
            url: app.globalData.allUrl + 'api/user/add_user',
            data: {
              "openid": wx.getStorageSync('openid'),
              "nickname": e.detail.userInfo.nickName,
              "language": e.detail.userInfo.language,
              "city": e.detail.userInfo.city,
              "province": e.detail.userInfo.province,
              "country": e.detail.userInfo.country,
              "gender": e.detail.userInfo.gender,
              "avatarUrl": e.detail.userInfo.avatarUrl
            },
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res)
              if (res.data != "" && res.data != null && res.data != undefined) {
                wx.showToast({
                   title: '插入成功',
                  icon: 'success',
                  duration: 5000,
                  mask: true
                })
                // that.setData({
                //   userInfo: e.detail.userInfo,
                //   hasUserInfo: true
                // })
                that.denglu();
                
              }
              //mYMaulTwPY1JBjbfyQ+dkA==

            },
            fail: function (err) {
              console.log(err);
              wx.showToast({
                title: '插入失败',
              })
            }

          })
        } else {
          console.log('11');
          that.onShow();
        }

      } else {
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 5000,
          mask: true
        })
      }
    },
    onLoad:function(op){
      // this.xinxi();
      console.log(wx.getStorageSync('yes'))
      // if (wx.getStorageSync('yes') == 'YES') {
      //   wx.switchTab({
      //     url: '../me/me',
      //   })
      // }
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
      console.log(wx.getSystemInfoSync().windowHeight)
    },
    onShow: function (op) {
      // this.denglu();
      this.xinxi();
      
    }
  }
})
