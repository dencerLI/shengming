//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    const updateManager = wx.getUpdateManager();    // 获取更新管理器对象
    updateManager.onCheckForUpdate(function (res) {
      // console.log(res)    检测更新结果
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，点击确定重新启动',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但是下载失败，请检查网络设置',
            showCancel: false
          })
        })
      }
    })
    
    var logs = wx.getStorageSync('logs') || []

    
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.setStorageSync("userInfo", '');
        wx.setStorageSync("phone", '');
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res)
            wx.setStorageSync('code', res.code);
            wx.request({
              url: 'http://47.105.112.194/user/login/login',
              // url: 'https://onmylive.com/user/login/login',
              data: {
                "code": res.code,
                "openid":""
              },
              method: 'GET',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res)
                wx.setStorageSync('session', res.data.session_key);
                wx.setStorageSync('openid', res.data.openid);
                wx.setStorageSync('yes', res.data.login);
                wx.setStorageSync('uid', res.data.uid);
                console.log(res.data.uid)
                // wx.showToast({
                //   title: res.data.uid.toString(),
                //   icon: 'none',
                //   duration: 2500,
                //   mask: true
                // })
                // if (res.data.login == 'YES'){
                //      wx.switchTab({
                //               url: '../index/index',
                //        })
                //  }

                //mYMaulTwPY1JBjbfyQ+dkA==
                that.globalData.employId = wx.getStorageSync('uid');
                //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (that.employIdCallback) {
                  console.log(that.globalData.employId)
                  that.employIdCallback(wx.getStorageSync('uid'));
                }

                that.globalData.op = wx.getStorageSync('openid');
                //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (that.opCallback) {
                  console.log(that.globalData.op)
                  that.opCallback(wx.getStorageSync('openid'));
                }
              },

            })

          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    aid:function(){
      if (wx.getStorageSync('uid') == "" || wx.getStorageSync('uid') == null || wx.getStorageSync('uid') == undefined) {
        wx.showToast({
          title: '您还没有授权,马上为您跳转到授权页',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../myindex/myindex',
          })
        }, 2000)
        return false;
      }else{
        return true;
      }
    },
    appnumber: function(val) {
          var  regPos = /^\d+(\.\d+)?$/; //非负浮点数
          var  regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
          if (regPos.test(val) || regNeg.test(val)) {
                return  true;
              }else  {
                return  false;
              }

        },
    allUrl:'http://47.105.112.194/',
    // allUrl: 'https://onmylive.com/',
    employId: '',
    op:''
  }
})