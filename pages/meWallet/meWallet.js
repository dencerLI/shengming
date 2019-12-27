// pages/meWallet/meWallet.js
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
    moneydata: '',
    isno:'none',
    end:"none",
    isinput: '',
    appUrl: app.globalData.allUrl,
    role:false,
    myname:'',
    mycard:'',
    tapTime: '',		// 防止两次点击操作间隔太快
    tapTime1: '',
    currentTab: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTab: function (e) {
      var that = this;

      if (that.data.currentTab === e.currentTarget.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.currentTarget.dataset.current,
        })
      }
    },
    goquxiao:function(){
      this.setData({ role: false})
    },
    gotijiao:function(){
      var that = this;
      var mycard = that.data.mycard;
      var myname = that.data.myname;
      // that.name(myname);
      // that.id(mycard);
      console.log(myname);
      console.log(mycard);
      if (myname == "" || myname == null || myname == undefined){
        wx.showToast({
          title: '姓名格式不正确',
          icon: 'none',
          duration: 5000,
          mask: true
        })
        that.setData({ myname: '' }) 
        return;
      }

      if (mycard == "" || mycard == null || mycard == undefined) {
        wx.showToast({
          title: '身份证格式不正确',
          icon: 'none',
          duration: 5000,
          mask: true
        })
        that.setData({ mycard: '' })
         return;
      }
      wx.request({
        url: app.globalData.allUrl + 'api/user/check_user',
        method: "POST", //指定请求方式，默认get
        data: { 'uid': wx.getStorageSync('uid'),
          'idNo': mycard,
          'name': myname},
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.respMessage == "身份证信息匹配"){
          wx.showToast({
            title: res.data.respMessage,
            icon: 'none',
            duration: 5000,
            mask: true
          })
            that.setData({ role: false })
            that.onShow();
          }else{
            wx.showToast({
              title: res.data.respMessage,
              icon: 'none',
              duration: 5000,
              mask: true
            })
          }
          // that.setData({
          //   dianhua: res.data
          // })
         
        }
      });
    },
    name: function (e) {
      var ts = this;
      var name = e.detail.value
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;

      // if (name.match(reg)) { console.log("111"); ts.setData({ allow_name: true }); wx.setStorageSync("name", name) }
      if (name.match(reg)) {
         console.log("111");
         ts.setData({myname:name})   
      }else{
        wx.showToast({
          title: '姓名格式不正确',
          icon: 'none',
          duration: 5000,
          mask: true
        })
        ts.setData({ myname: '' }) 
      }
      console.log(name)
    },
    id: function (e) {
      var ts = this;
      var code = e.detail.value
      console.log(code)
      if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e.detail.value))) {
        wx.showToast({
          title: '身份证号码有误',
          duration: 2000,
          icon: 'none',
          mask: true
        });
        ts.setData({ mycard:''})
      }else{
        ts.setData({ mycard: code })
      }
},
    yyue:function(){
      var that = this;
      var nowTime = new Date();
      // console.log("本次点击时间" +nowTime);
      // console.log("第一次时间"+this.data.tapTime);
      if (nowTime - this.data.tapTime1 < 25000) {
        console.log('阻断')
        return;
      }
      console.log('执行')
      this.setData({ tapTime1: nowTime });
      console.log(app.globalData.allUrl + 'api/my/trun_balance ')
      wx.request({
        url: app.globalData.allUrl + 'api/my/trun_balance',
        method: "POST",//指定请求方式，默认get
        data: { 'uid': wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res)
          if (res.data.res == '1' || res.data.res == 1){
            wx.showToast({
              title: '成功，' + res.data.msg,
              icon: 'none',
              duration: 5000,
              mask: true
            })
            that.onShow();
          }else{
            wx.showToast({
              title: '失败，' + res.data.msg,
              icon: 'none',
              duration: 5000,
              mask: true
            })
          }
        }
      });
    },
    iscon: function () {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/user/wallet_detail',
        method: "POST",//指定请求方式，默认get
        data: { 'userid': wx.getStorageSync('uid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            moneydata: res.data.data
          })
        }
      });
    },gocash:function(){
      console.log(this.data.moneydata.check)
      if (this.data.moneydata.check == "1"){
           this.setData({isno:"block"})
      } else if (this.data.moneydata.check == "2"){
        this.setData({ role: true })
      }
    }, gotixian: function () {
      this.setData({ end: "block", isno: "none" })
    },close: function () {
      this.setData({ end: "none" })
    },kong: function () {
     
    }, isphone: function (e) {
      var that = this;
      console.log(e.detail.value)
      // var isinput = that.data.isinput;
      // var k = app.globalData.appnumber(e.detail.value);
      // if (k == false && e.detail.value!=''){
      //   that.setData({
      //     isinput: isinput
      //   })
      // }else{
      that.setData({
        isinput: e.detail.value
      })
      // }
    },ti: function () {
      var that=this;
      var nowTime = new Date();
      // console.log("本次点击时间" +nowTime);
      // console.log("第一次时间"+this.data.tapTime);
      if (nowTime - this.data.tapTime < 25000) {
        console.log('阻断')
        return;
      }
      console.log('执行')
      this.setData({ tapTime: nowTime });
      var isinput=that.data.isinput;
      var k=app.globalData.appnumber(isinput);
      console.log(k)
      if (k == false || isinput < 2 || isinput > 300){
        wx.showToast({
          title: '提现金额错误',
          icon: 'none',
          duration: 5000,
          mask: true
        })
        return;
      }
      
      console.log({ 'uid': wx.getStorageSync('uid'), 'price': Math.round(isinput * 100), 'balance': Math.round(parseFloat(isinput * 95).toFixed(2))})
      // return;
      wx.request({
        url: app.globalData.allUrl + 'api/buys/pull_monney112',
        method: "POST",//指定请求方式，默认get
        data: { 'uid': wx.getStorageSync('uid'), 'price': Math.round(isinput * 100), 'balance': Math.round(parseFloat(isinput * 95).toFixed(2)), 'openid': wx.getStorageSync('openid') },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res)
          if (res.data.result_code =="SUCCESS"){
            wx.showToast({
              title: res.data.err_code_des,
              icon: 'none',
              duration: 5000,
              mask: true
            })
            that.close();
            that.onShow();
          } else if (res.data.result_code == "FAIL"){
            wx.showToast({
              title: res.data.err_code_des,
              icon: 'none',
              duration: 5000,
              mask: true
            })
            that.close();
            that.onShow();
          }else{
            wx.showToast({
              title: res.data.err_code_des,
              icon: 'none',
              duration: 5000,
              mask: true
            })
            that.close();
            that.onShow();
          }
          // that.setData({
          //   moneydata: res.data.data
          // })

        }
      });
    },
    onShow: function () {
      this.iscon();
    }
  }
})
