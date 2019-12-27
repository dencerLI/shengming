// pages/sweepcode1/sweepcode1.js
const app = getApp();
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
    checked1: false,
    checked2: false,
    checked3: false,
    tian: 1,
    appUrl: app.globalData.allUrl,
    isdata:'',
    chaxun:'',
    chaxun1:'',
    yingfu:0,
    yingfu1: 0,
    sj:'',
    wo: 'none',
    isupload: "?" + Math.random() / 9999,
    tapTime: '',		// 防止两次点击操作间隔太快
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goindex:function(){
      wx.switchTab({
        url: '../index/index'
      })
    },
    successme: function (uid, p_type, price, bag_id, wx_order_id, cost_wx, cost_balance, ticket_type, engineid) {
      var that = this;
      wx.hideLoading();
      // console.log(orderid);
      
        var yodata = {
          'uid': uid,
          'p_type': p_type,
          'price': price,
          'bag_id': bag_id,
          'wx_order_id': wx_order_id,
          'cost_wx': cost_wx,
          'cost_balance': cost_balance,
          'ticket_type': ticket_type,
          'engineid': engineid
          
        }
        console.log(yodata)
      // return;
      wx.request({
        url: app.globalData.allUrl + 'api/buys/suc_engine_order',
        method: "POST", //指定请求方式，默认get
        data: yodata,
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res)
          // var hi = JSON.parse(res.data);
          
          if (res.data.status== '0') {
            wx.showToast({
              title: res.data.suc,
              icon: 'none', //如果要纯文本，不要icon，将值设为'none'
              mask: true,
              duration: 2000
            })
            that.goindex();
          } else {
            wx.showToast({
              title: res.data.err,
              icon: 'none', //如果要纯文本，不要icon，将值设为'none'
              mask: true,
              duration: 2000
            })
          }

          // console.log(hi)

        }
      });
    },
    zhifu: function (mydata) {
      wx.showLoading({
        title: '支付跳转中...',
        mask: true
      });
      var that = this;
      var ck1 = that.data.checked1;
      var ck2 = that.data.checked2;
      var ck3 = that.data.checked3;
      console.log(mydata)
      console.log("应付款为：" + that.data.yingfu )
      mydata.price = that.data.yingfu * 100;
      // that.successme();
      // return;
      console.log(mydata)
      wx.request({
        url: app.globalData.allUrl + 'api/buys/buy',
        method: "POST", //指定请求方式，默认get
        data: mydata,
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          var hi = JSON.parse(res.data);
          
          console.log(hi)
          // return;
          that.setData({ orderme: hi.package.split("=")[1] })
          // if (ck1==true) {//水票支付
          //   that.successme(wx.getStorageSync('uid'), 6, that.data.yingfu1, that.data.isdata.id, hi.package.split("=")[1], 0, 0, that.data.chaxun.type, that.data.sj.m)
          // } else if (ck3 == true){//余额支付
          //   that.successme(wx.getStorageSync('uid'), 6, that.data.yingfu1, that.data.isdata.id, hi.package.split("=")[1], 0, that.data.yingfu, that.data.chaxun.type, that.data.sj.m)
          // } else {//微信支付
            wx.requestPayment({
              timeStamp: hi.timeStamp,
              nonceStr: hi.nonceStr,
              package: hi.package,
              signType: hi.signType,
              paySign: hi.paySign,
              success(res) {
                console.log(res);
                wx.hideLoading();
                
                console.log(hi.package.split("=")[1])
                //向后台传参

                // that.successme(hi.package.split("=")[1], that.data.yingfu);
                that.successme(wx.getStorageSync('uid'), 6, that.data.yingfu1, that.data.isdata.id, hi.package.split("=")[1], that.data.yingfu, 0, 5, that.data.sj.id.split("x")[1])
                //that.data.sj.m
              },
              fail(res) {
                wx.hideLoading();
                wx.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          // }
        }
      });
    },
    goumai:function(e){
      console.log(e.currentTarget.dataset)
      if (app.globalData.aid() == false) {
        return;
      }
      var nowTime = new Date();
      if (nowTime - this.data.tapTime < 5000) {
        console.log('阻断')
        return;
      }
      console.log('执行')
      this.setData({ tapTime: nowTime });
      var that=this;
      if (e.currentTarget.dataset.kong == "none") {
         that.setData({ wo: "block" })
       var kml=setInterval(function(){
          that.setData({ wo: "none" })
          clearInterval(kml)
         },20000)
      } else {
          return;
      }
      console.log(that.data.checked1 + '===' + that.data.checked2 + '===' + that.data.checked3)
      if (that.data.checked1 == false && that.data.checked2 == false && that.data.checked3 == false){
        wx.showToast({
          title: '请选择结算方式',
          mask: true,
          icon: 'none',
          duration: 2000
        })
       
      } else if (that.data.chaxun1 == '1' || that.data.chaxun1 == 1){
        wx.showToast({
          title: '请先绑定手机',
          mask: true,
          icon: 'none',
          duration: 2000
        })
       
        wx.navigateTo({
          url: '../sweepcode/sweepcode',
        })
      } else if (that.data.checked1 == true &&that.data.checked2 == false && that.data.checked3 == false){//执行水票抵扣
        that.successme(wx.getStorageSync('uid'), 6, that.data.yingfu1, that.data.isdata.id, '', 0, 0, that.data.chaxun.type, that.data.sj.id.split("x")[1])
      } else if (that.data.checked1 == false && that.data.checked2 == true && that.data.checked3 == false){//执行微信支付
        that.zhifu({
          'uid': wx.getStorageSync('uid'),
          'body': '测试数据',
          'attach': "生命之里小程序支付",
          'price': 1
        })
      }else{//余额抵扣
        console.log(that.data.yingfu)
        that.successme(wx.getStorageSync('uid'), 6, that.data.yingfu1, that.data.isdata.id, '', 0, that.data.yingfu1, that.data.chaxun.type, that.data.sj.id.split("x")[1])
      }
      
    },
    checkedTap1: function (e) {
      var that=this;
      var checked = this.data.checked1;
      console.log(checked);
      if (that.data.chaxun.tickets >= 0 && that.data.chaxun.tickets != null && that.data.chaxun.tickets != '' && that.data.chaxun.tickets!=undefined){
        if (checked==false){
        that.setData({
          checked1: true,
          checked2: false,
          checked3: false,
          yingfu:0
        })
        }else{
          that.setData({
            checked1: false,
            checked2: false,
            checked3: false,
            yingfu: that.data.yingfu1
          })
        }
      }else{
        wx.showToast({
          title: '您水票不足哦！',
          mask: true,
          icon: 'none',
          duration: 2000
        })
      }
      

    },
    checkedTap2: function (e) {  
      var that = this;
      var checked = this.data.checked2;
      console.log(checked);
      that.setData({
        yingfu: that.data.yingfu1
      })
      if (checked == false) {
        that.setData({
          checked1: false,
          checked2: true,
          checked3: false,
          yingfu: that.data.yingfu1
        })
      } else {
        that.setData({
          checked1: false,
          checked2: false,
          checked3: false,
          yingfu: that.data.yingfu1
        })
      }
      // this.setData({
      //   checked2: !checked
      // })

    }
    , checkedTap3: function (e) {
      
      var that = this;
      console.log(that.data.chaxun.money);
      console.log(that.data.yingfu1);
      // console.log(that.data.chaxun.money);
      if (that.data.chaxun.money != '' && that.data.chaxun.money != null && that.data.chaxun.money != undefined && that.data.yingfu1 != '' && that.data.yingfu1 != null && that.data.yingfu1 != undefined ){
        
      }else{
        wx.showToast({
          title: '金额异常！',
          mask: true,
          icon: 'none',
          duration: 2000
        })
        that.setData({

          checked3: false,

        })
        return;
      }

      if (that.data.chaxun.money >= that.data.yingfu1){

      }else{
        wx.showToast({
          title: '余额不足抵扣哦！',
          mask: true,
          icon: 'none',
          duration: 2000
        })
        that.setData({

          checked3: false,

        })
        return;
      }
      var checked = that.data.checked3;
      console.log(checked);
      that.setData({
        yingfu: that.data.yingfu1
      })
      console.log((that.data.chaxun.money - that.data.yingfu1).toFixed(1))
      if (checked == false) {
        that.setData({
          checked1: false,
          checked2: false,
          checked3: true,
          yingfu: 0
        })
      } else {
        that.setData({
          checked1: false,
          checked2: false,
          checked3: false,
          yingfu: that.data.yingfu1
        })
      }

    },jifen: function () {
      var that = this;
      console.log(wx.getStorageSync('uid'))
      wx.request({
        url: app.globalData.allUrl + 'api/user/user_ticket_money',
        method: "POST", //指定请求方式，默认get
        data: {
          'userid': wx.getStorageSync('uid')
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          // var hi = JSON.parse(res.data);
          that.setData({
            chaxun: res.data
          })
          // console.log(hi)

        }
      });
    }, jifen2: function () {
      var that = this;
      console.log(wx.getStorageSync('uid'))
      wx.request({
        url: app.globalData.allUrl + 'api/user/check_phone',
        method: "POST", //指定请求方式，默认get
        data: {
          'uid': wx.getStorageSync('uid')
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          // var hi = JSON.parse(res.data);
          that.setData({
            chaxun1: res.data
          })
          // console.log(hi)

        }
      });
    }, getCurrentPageUrl: function() {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length - 1] //获取当前页面的对象
      var url = currentPage.route //当前页面url
      console.log(url)
      return url
    },shoplist:function(id){
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/goods/get_args_bag',
        method: "POST", //指定请求方式，默认get
        data: {"id":id},
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            isdata: res.data.data,
            yingfu: res.data.data.normal_price,
            yingfu1: res.data.data.normal_price
            })
        }
      });
    }, onLoad: function (options){
      var scene = decodeURIComponent(options.q)
      console.log(decodeURIComponent(options.q))
      this.setData({ sj: scene})
      wx.showToast({
        title: scene.id,
        mask: true,
        icon: 'none',
        duration: 2000
      })
      if (wx.getStorageSync('uid') != '' && wx.getStorageSync('uid') != null && wx.getStorageSync('uid') != undefined) {
        console.log(wx.getStorageSync('uid'))
        if (app.globalData.aid() == false) {
          return;
        }
        this.shoplist(2);
        this.jifen();
      } else {
        console.log(app.globalData.employId)
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.employIdCallback = employId => {
          if (employId != '') {
            if (app.globalData.aid() == false) {
              return;
            }
            this.shoplist(2);
            this.jifen();
          }
        }
      }
    },
    onShow:function(){
      // this.getCurrentPageUrl();
      console.log(wx.getStorageSync('uid'))
      this.jifen2();
      // if (wx.getStorageSync('uid') != '' && wx.getStorageSync('uid') != null && wx.getStorageSync('uid') != undefined) {
      //   console.log(wx.getStorageSync('uid'))
      // if (app.globalData.aid() == false) {
      //   return;
      // }
      // this.shoplist(2);
      // this.jifen();
      // } else {
      //   console.log(app.globalData.employId)
      //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //   // 所以此处加入 callback 以防止这种情况
      //   app.employIdCallback = employId => {
      //     if (employId != '') {
      //       if (app.globalData.aid() == false) {
      //         return;
      //       }
      //       this.shoplist(2);
      //       this.jifen();
      //     }
      //   }
      // }
    }
  }
})
