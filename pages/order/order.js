// pages/order/order.js
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
    selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['干净，健康', '包装精美', '方便，新颖'], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    items: [{
      name: 'yes',
      value: '中国',
      checked: 'true'
    }, ],
    checked: true,
    checked1: false,
    checked2: false,
    checked3: false,
    yes: '',
    mou: "none",
    mou1: "none",
    address: null,
    address1: '',
    goods: '',
    laican: '',
    isname: 'liang',
    iscolor: "#ef5126",
    aa: '0',
    yfk:0,
    chaxun:'',
    yfk1: 0,
    jfdk:0,
    yhqdk: 0,
    yedk: 0,
    noyes:'none',
    addressid:'',
    orderme:'',
    zhi:'',
    zhi1: '',
    appUrl: app.globalData.allUrl,
    wo: 'none'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selectTap() {
      this.setData({
        selectShow: !this.data.selectShow
      });
    },
    // 点击下拉列表
    optionTap(e) {
      let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
      this.setData({
        index: Index,
        selectShow: !this.data.selectShow
      });
    },
    checkedTap: function(e) {
      var checked = this.data.checked;
      console.log(checked);
      console.log(e.currentTarget.dataset.val)
      if(checked==true){
        
      }else{
        this.setData({
          "checked": true,
          "checked1": false,
        })
      }

    }, checkedTap1: function (e) {
      var checked = this.data.checked1;
      // console.log(checked);
      // console.log(e.currentTarget.dataset.val)
      // console.log(this.data.checked2);
      // console.log(this.data.checked3);
      var ck2 = this.data.checked2;
      var ck3 = this.data.checked3;
      var yue = this.data.chaxun.balance;
      var jifen = this.data.chaxun.point;
      var yhq = this.data.chaxun.new_cash;
      var yfk = this.data.yfk;
      var yfk1 = this.data.yfk1;
      console.log(yfk);
      console.log(yue);
      console.log(jifen);
      console.log(yhq);
      if (checked == true) {//取消余额
        if (ck2==true){//如果选择的是积分
          var yall = yfk1 - (jifen/10)
          
        } else if (ck3 == true){
          var yall = yfk1 - (yhq*10);
         
        }else{
          var yall = yfk1 ;
          
        }
        this.setData({
          "checked1": false,
          yfk:yall
        })
      }else{//选中余额
       
        if (this.data.checked2 == true) {//如果选择的是积分
          var yall = yfk1 - yue- (jifen / 10);
          
        } else if(ck3 == true){
          var yall = yfk1 - yue- (yhq * 10);
       
        } else {
          yall = yfk1 - yue
        }
        if (yall < 0) {
          var yall = 0;
        }
        this.setData({
          "checked1":true,
           yfk:yall
        })
      }

    }, checkedTap2: function (e) {
      var checked = this.data.checked2;
      console.log(checked);
      console.log(e.currentTarget.dataset.val)
      var ck1 = this.data.checked1;
      var ck3 = this.data.checked3;
      var yue = this.data.chaxun.balance;
      var jifen = this.data.chaxun.point;
      var yhq = this.data.chaxun.new_cash;
      var yfk = this.data.yfk;
      var yfk1 = this.data.yfk1;
      if (checked == true) {
        
      } else {
        if (this.data.checked1 == true) {//如果选择了余额
          var yall = yfk1 - yue - (jifen / 10)
        } else {
          var yall = yfk1 - (jifen / 10)
        }
        if (yall < 0) {
          var yall = 0;
        }
        this.setData({
          "checked2": true,
          "checked3": false,
          yfk: yall
        })
      }

    }, checkedTap3: function (e) {
      var checked = this.data.checked3;
      console.log(checked);
      console.log(e.currentTarget.dataset.val)
      var ck1 = this.data.checked1;
      var ck2 = this.data.checked2;
      var yue = this.data.chaxun.balance;
      var jifen = this.data.chaxun.point;
      var yhq = this.data.chaxun.new_cash;
      var yfk = this.data.yfk;
      var yfk1 = this.data.yfk1;
      if (checked == true) {

      } else {
        if (this.data.checked1 == true) {//如果选择了余额
          var yall = yfk1 - yue - (yhq * 10)
        } else {
          var yall = yfk1 - (yhq * 10)
        }
        if(yall<0){
          yall=0;
        }
        this.setData({
          "checked2": false,
          "checked3": true,
          yfk: yall
        })
      }

    }, yinc:function(){
      this.setData({
        noyes: 'none'
      })
    },goindex: function () {
      wx.switchTab({
        url: '../index/index'
      })
    }, gowater: function () {
      wx.navigateTo({
        url: '../call/call'　　// 页面 A
      })
    },
    checkboxChange: function(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      this.setData({
        yes: e.detail.value
      })
      if (e.detail.value.length == 0) {
        this.setData({
          isname: 'hui',
          iscolor: "#999999"
        })
      } else {
        this.setData({
          isname: 'liang',
          iscolor: "#ef5126"
        })
      }

    },
    yinsi: function(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      this.setData({
        mou1: 'block'
      })
    },
    tui: function() {
      this.setData({
        mou: 'block'
      })
    },
    guan: function() {
      this.setData({
        mou: "none",
        mou1: "none"
      })
    },
    kong: function() {

    },
    address: function() {

      wx.navigateTo({
        url: '../administration/administration',
      })
    },
    addressselect: function(mydata) {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/goods/buy_add_nums',
        method: "POST", //指定请求方式，默认get
        data: mydata,
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function(res) {
          console.log(res.data)
          // if (that.data.address1 != '' && that.data.address1 != null && that.data.address1 != undefined) {
          //   var dizhi = that.data.address1;
          // } else {
            var dizhi = res.data.data.address;
          // }
          if(res.data.data.goods.sale_price==null){
            var qian = res.data.data.goods.normal_price*that.data.laican.num
          }else{
            var qian = res.data.data.goods.sale_price * that.data.laican.num
          }
          that.setData({
            address: dizhi,
            goods: res.data.data.goods,
            yfk:qian,
            yfk1: qian,
           
          })
          if (res.data.data.address != null) {
            that.setData({ addressid: res.data.data.address.id })
          } else {

          }
          console.log(that.data.yfk)
        }
      });
    }, addressselect1: function (mydata) {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/goods/combo_add_nums',
        method: "POST", //指定请求方式，默认get
        data: mydata,
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          // if (that.data.address1 != '' && that.data.address1 != null && that.data.address1 != undefined) {
          //   var dizhi = that.data.address1;
          // } else {
          var dizhi = res.data.data.address;
          // }
          // if (res.data.data.goods.sale_price == null) {
          if (that.data.laican.isval!=0){
            var qian = that.data.laican.isval * that.data.laican.num
          }else{
            var qian = res.data.data.goods.price * that.data.laican.num
          }
          console.log(qian)
          // } else {
          //   var qian = res.data.data.goods.sale_price * that.data.laican.num
          // }
          that.setData({
            address: dizhi,
            goods: res.data.data.goods,
            yfk: qian,
            yfk1: qian
            
          })
          if(res.data.data.address!=null){
            that.setData({ addressid: res.data.data.address.id})
          }else{

          }
          console.log(that.data.yfk)
        }
      });
    },
    zhifu: function(mydata) {
      
      var that = this;
      var ck1 = that.data.checked1;
      var ck2 = that.data.checked2;
      var ck3 = that.data.checked3;
      var yue = this.data.chaxun.balance;
      var jifen = this.data.chaxun.point;
      var yhq = this.data.chaxun.new_cash;
      var yfk = this.data.yfk;
      var yfk1 = this.data.yfk1;
      console.log(yfk)
      console.log(ck1 + '--' + ck2 + '--' + ck3)
      if (ck1 == true && ck2 == true && ck3 == false) {//余额加积分
        if (yfk1 >= (jifen / 10)) {
          //如果默认总价大于积分
          if (yue >= yfk1 - (jifen / 10)) {
            //如果余额大于等于积分已经抵扣过的钱数
            that.setData({
              jfdk: jifen,
              yhqdk: 0,
              yedk: yue - (yue - (yfk1 - (jifen / 10))),
            })
          } else {
            that.setData({
              jfdk: jifen,
              yhqdk: 0,
              yedk: yue,
            })
          }

        } else {
          that.setData({
            jfdk: yfk1,
            yhqdk: 0,
            yedk: 0,
          })
        }
      }

      if (ck1 == true && ck2 == false && ck3 == true) {//余额加优惠券
        if (yfk1 >= (yhq * 10)) {
          //如果默认总价大于优惠券
          if (yue >= yfk1 - (yhq * 10)) {
            //如果余额大于等于优惠券已经抵扣过的钱数
            that.setData({
              jfdk: 0,
              yhqdk: yhq * 10,
              yedk: yue - (yue - (yfk1 - (yhq * 10))),
            })
          } else {
            that.setData({
              jfdk: 0,
              yhqdk: yhq * 10,
              yedk: yue,
            })
          }

        } else {
          that.setData({
            jfdk: 0,
            yhqdk: yfk1,
            yedk: 0,
          })
        }
      }

      if (ck1 == true && ck2 == false && ck3 == false) {//余额
        if (yfk1 >= yue) {
          that.setData({
            jfdk: 0,
            yhqdk: 0,
            yedk: yue,
          })
        } else {
          that.setData({
            jfdk: 0,
            yhqdk: 0,
            yedk: yfk1,
          })
        }
      }


      if (ck1 == false && ck2 == true && ck3 == false) {//积分
        if (yfk1 >= jifen) {
          that.setData({
            jfdk: jifen,
            yhqdk: 0,
            yedk: 0,
          })
        } else {
          that.setData({
            jfdk: yfk1,
            yhqdk: 0,
            yedk: 0,
          })
        }
      }

      if (ck1 == false && ck2 == false && ck3 == true) {//优惠券
        if (yfk1 >= yhq) {
          that.setData({
            jfdk: 0,
            yhqdk: yhq,
            yedk: 0,
          })
        } else {
          that.setData({
            jfdk: 0,
            yhqdk: yfk1,
            yedk: 0,
          })
        }
      }
      console.log("应付款为：" + that.data.yfk + "积分抵扣" + that.data.jfdk + "优惠券抵扣" + that.data.yhqdk + "余额抵扣" + that.data.yedk)
      mydata.price = that.data.yfk*100;
      if (that.data.yfk==0){
        that.successme('', that.data.yfk, that.data.jfdk, that.data.yhqdk, that.data.yedk);
      }else{
      // that.successme();
      // return;
        wx.showLoading({
          title: '支付跳转中...',
          mask: true
        });
      wx.request({
        url: app.globalData.allUrl + 'api/buys/buy',
        method: "POST", //指定请求方式，默认get
        data: mydata,
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function(res) {
          console.log(res.data)
          var hi = JSON.parse(res.data);
          // that.setData({
          //   address: dizhi   
          // })
          console.log(hi)
          // return;
          that.setData({ orderme: hi.package.split("=")[1]})
          
          wx.requestPayment({
            timeStamp: hi.timeStamp,
            nonceStr: hi.nonceStr,
            package: hi.package,
            signType: hi.signType,
            paySign: hi.paySign,
            success(res) {
              console.log(res);
              wx.hideLoading();
              // wx.showToast({
              //   title: '支付成功',
              //   icon: 'none',
              //   duration: 2000
              // })
              console.log(hi.package.split("=")[1])
              //向后台传参

              that.successme(hi.package.split("=")[1], that.data.yfk, that.data.jfdk, that.data.yhqdk, that.data.yedk);
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
          
        }
      });
      }
    },
    successme:function(orderid,yfk,jfdk,yhqdk,yedk){
      var that = this;
      console.log(orderid + '---' + yfk + '---' + jfdk + '---' + yhqdk + '---' +yedk);
      var hk = that.data.laican;
      
        if (that.data.laican.ptype == 1 || that.data.laican.ptype == 2 || that.data.laican.ptype == 3 || that.data.laican.ptype == 9){
        if (hk.zhi1 =="天然水"){
          if (hk.mval == 98) {
            var type1 = 3;
          }else{
            var type1 = that.data.goods.p_type;
          }
          
          var yodata = {
            'uid': wx.getStorageSync('uid'),
            'phone': '',
            'p_type': type1,
            'p_id': that.data.laican.id,
            'bag_id': '',
            'bottle_id': '',
            'e_id': '',
            'wx_order_id': orderid,
            'cost_wx': yfk,
            'cost_balance': yedk,
            'cost_point': jfdk,
            'cost_cash': yhqdk,
            'address_id': that.data.addressid,
            'point_type': that.data.chaxun.point_type,
            'sold_num': hk.zhi,
            'sold_soda_num': '',
            'nums': hk.num,
            'is_ticket': that.data.goods.ticket_type,
            'price': that.data.yfk1
          }
        } else if (hk.zhi1 == "苏打水"){
          if (hk.mval == 98) {
            var type1 = 3;
          } else {
            var type1 = that.data.goods.p_type;
          }
          var yodata = {
            'uid': wx.getStorageSync('uid'),
            'phone': '',
            'p_type': type1,
            'p_id': that.data.laican.id,
            'bag_id': '',
            'bottle_id': '',
            'e_id': '',
            'wx_order_id': orderid,
            'cost_wx': yfk,
            'cost_balance': yedk,
            'cost_point': jfdk,
            'cost_cash': yhqdk,
            'address_id': that.data.addressid,
            'point_type': that.data.chaxun.point_type,
            'sold_num': '',
            'sold_soda_num': hk.zhi,
            'nums': hk.num,
            'is_ticket': that.data.goods.ticket_type,
            'price': that.data.yfk1
          }
        }
        } else if (that.data.goods.p_type==7){
          var yodata = {
            'uid': wx.getStorageSync('uid'),
            'phone': '',
            'p_type': that.data.goods.p_type,
            'p_id': that.data.laican.id,
            'bag_id': '',
            'bottle_id': that.data.laican.id,
            'e_id': '',
            'wx_order_id': orderid,
            'cost_wx': yfk,
            'cost_balance': yedk,
            'cost_point': jfdk,
            'cost_cash': yhqdk,
            'address_id': that.data.addressid,
            'point_type': that.data.chaxun.point_type,
            'sold_num': hk.num,
            'sold_soda_num': '',
            'nums': hk.num,
            'is_ticket': that.data.goods.ticket_type,
            'price': that.data.yfk1
          }
          console.log(yodata)
        } else if (that.data.goods.p_type == 6) {
          var yodata = {
            'uid': wx.getStorageSync('uid'),
            'phone': '',
            'p_type': that.data.goods.p_type,
            'p_id': that.data.laican.id,
            'bag_id': that.data.laican.id,
            'bottle_id': '',
            'e_id': '',
            'wx_order_id': orderid,
            'cost_wx': yfk,
            'cost_balance': yedk,
            'cost_point': jfdk,
            'cost_cash': yhqdk,
            'address_id': that.data.addressid,
            'point_type': that.data.chaxun.point_type,
            'sold_num': hk.num,
            'sold_soda_num': '',
            'nums': hk.num,
            'is_ticket': that.data.goods.ticket_type,
            'price': that.data.yfk1
          }
          console.log(yodata)
        } else if (that.data.goods.p_type == 8) {
          var yodata = {
            'uid': wx.getStorageSync('uid'),
            'phone': '',
            'p_type': that.data.goods.p_type,
            'p_id': that.data.laican.id,
            'bag_id': '',
            'bottle_id': '',
            'e_id': that.data.laican.id,
            'wx_order_id': orderid,
            'cost_wx': yfk,
            'cost_balance': yedk,
            'cost_point': jfdk,
            'cost_cash': yhqdk,
            'address_id': that.data.addressid,
            'point_type': that.data.chaxun.point_type,
            'sold_num': hk.num,
            'sold_soda_num': '',
            'nums': hk.num,
            'is_ticket': that.data.goods.ticket_type,
            'price': that.data.yfk1
          }
          console.log(yodata)
        }else{
      var yodata = {
        'uid': wx.getStorageSync('uid'),
        'phone': '',
        'p_type': that.data.goods.p_type,
        'p_id': that.data.laican.id,
        'bag_id': '',
        'bottle_id': '',
        'e_id': '',
        'wx_order_id': orderid,
        'cost_wx': yfk,
        'cost_balance': yedk,
        'cost_point': jfdk,
        'cost_cash': yhqdk,
        'address_id': that.data.addressid,
        'point_type': that.data.chaxun.point_type,
        'sold_num': hk.num,
        'sold_soda_num': '',
        'nums': hk.num,
        'is_ticket': that.data.goods.ticket_type,
        'price': that.data.yfk1
      }
      console.log(yodata)
      }
      wx.request({
        url: app.globalData.allUrl + 'api/buys/suc_order',
        method: "POST", //指定请求方式，默认get
        data: yodata,
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          // var hi = JSON.parse(res.data);
          that.setData({ wo: "none" })
          if (res.data == true){
          that.setData({
            noyes: "block"
          })
          }else{
            that.setData({
              noyes: "none"
            })
            wx.showToast({
              title: "操作失败！请阅读规则或重新尝试",
              icon: 'none', //如果要纯文本，不要icon，将值设为'none'
              mask: true,
              duration: 5000
            })
          }

          // console.log(hi)

        }
      });
    },
    payment: function(e) {
      var that = this;
      if (app.globalData.aid() == false) {
        return;
      }
      if (e.currentTarget.dataset.kong == "none") {
        that.setData({ wo: "block" })
      } else {
        return;
      }
      console.log(e.currentTarget.dataset.name)
      let name = e.currentTarget.dataset.name;
      if (name == "liang") { //去支付
        if (that.data.address != '' && that.data.address != null && that.data.address != undefined || that.data.address1 != '' && that.data.address1 != null && that.data.address1 != undefined) {
          //price=that.data.laican.num*that.data.goods.sale_price
          that.zhifu({
            'uid': wx.getStorageSync('uid'),
            'body': '测试数据',
            'attach': "生命之里小程序支付",
            'price': 1
          })
        } else {
          wx.showToast({
            title: '请填写地址',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            mask: true,
            duration: 2000
          })
          that.setData({ wo: "none" })
        }
      } else {
        wx.showToast({
          title: '请先同意用户条约',
          icon: 'none',
          duration: 2000,
          mask: true //是否有透明蒙层，默认为false 

        })
        that.setData({ wo: "none" })
      }
      // this.setData({
      //   mou1: 'block'
      // })
    },
    jifen: function() {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/buys/my_res',
        method: "POST", //指定请求方式，默认get
        data: {
          'uid': wx.getStorageSync('uid')
        },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function(res) {
          console.log(res.data)
          // var hi = JSON.parse(res.data);
          that.setData({
            chaxun: res.data
          })
          // console.log(hi)

        }
      });
    },
    onLoad: function(op) {
      console.log(op)
      let that = this;
      // that.addressselect(op);
      if (op.table != '' && op.table != null && op.table != undefined && op.table != "undefined"){
        var xinop={"id":op.id,"num":op.num,"table":op.table,"userid":op.userid}
        that.setData({
          laican: op
        });
        that.addressselect(xinop);
      }else{
        var xinop = { "id": op.id, "userid": op.userid }
        that.setData({
          laican: op,
        });
        that.addressselect1(xinop);
      }
      
      console.log(that.data.address1)
      
    },
    onReady: function() {
      let that = this;
      console.log(that.data.address1)
      
    },
    onShow: function() {

      let that = this;
      that.jifen();
      console.log(that.data.laican);
      console.log(that.data.address1);
      
    }
  }
})