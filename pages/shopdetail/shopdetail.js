// pages/shopdetail/shopdetail.js
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
    alldata:'',
    yuan: 0,
    yuan1: 0,
    val:1,
    dis:'none',
    id:'',
    table:'',
    intlist:'',
    qie:'block',
    qie1:"block",
    class1:'hei',
    class2: 'hei',
    class3: 'hei',
    class4: 'hei',
    zhi:'35',
    zhi1:'苏打水',
    nuu:'',
    endt:'',
    mai:'hei',
    mval: 0,
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
     order:function(){
       let that=this;
       that.setData({dis:"block"});
       
      //  wx.navigateTo({
      //    url: '../order/order',
      //  })
    },iskan:function(){
      wx.navigateTo({
        url: '../content/content?id=3'
        //  url: '../logs/logs'
      })
    }, goumai:function(e){
      var that=this;
      var val = e.currentTarget.dataset.val;
      var all = that.data.yuan;
      var all1 = that.data.yuan1;

      if(val==0){
          // all.price = all.price + val;
        that.setData({ mval: 98, mai: "hei1", yuan: all1+98})
      }else{
        that.setData({ mval: 0, mai: "hei", yuan: all1})
      }
    },
     suda:function(id,type){
       var that = this;
       wx.request({
         url: app.globalData.allUrl + 'api/goods/combo_detail',
         method: "POST",//指定请求方式，默认get
         data: { "type_id": id, "b_type": type },
         header: {
           //默认值'Content-Type': 'application/json'
           'content-type': 'application/x-www-form-urlencoded' //post
         },
         success: function (res) {
           console.log(res.data)
           if(type==0){
             var hk="苏打水";
             var heiha="hei1";
             var heiha1 = "hei";
           }
           if (type == 1) {
             var hk = "天然水";
             var heiha = "hei";
             var heiha1 = "hei1";
           }
           that.setData({
             endt: res.data.data,
             zhi1:hk,
             zhi: res.data.data[0].b_num,
             class1: 'hei1',
             class2: 'hei',
             class3: heiha1,
             class4: heiha,
           })
         }
       });
     },
    shuiji:function(e){
      let that=this;
      console.log(e.currentTarget.dataset.val)
      let onbtn = e.currentTarget.dataset.val;
      let text = e.currentTarget.dataset.zhi;
      var isid = that.data.alldata.p_type;
      if(onbtn=="1"){
         that.setData({
            class1:'hei1',
            class2:'hei',
            zhi:text
         })
      }

      if (onbtn == "2") {
        that.setData({
          class2: 'hei1',
          class1: 'hei',
          zhi: text
        })
      }


      if (onbtn == "3") {
        that.setData({
          class3: 'hei1',
          class4: 'hei',
          zhi1: text
        })
        if (that.data.alldata.p_type == 1 || that.data.alldata.p_type == 2 || that.data.alldata.p_type == 3) {
          that.suda(1, 1)
        }
        if (that.data.alldata.p_type == 9) {
          that.suda(2, 1)
        }
       
      }

      if (onbtn == "4") {
        that.setData({
          class4: 'hei1',
          class3: 'hei',
          zhi1: text
        })
        if (that.data.alldata.p_type == 1 || that.data.alldata.p_type == 2 || that.data.alldata.p_type == 3) {
          that.suda(1, 0)
        }
        if (that.data.alldata.p_type == 9) {
          that.suda(2, 0)
        }
      }
    },
    jinzhi:function(){

    },
    close:function(){
      this.setData({
        dis:'none'
      })
    },
    isorder: function () {
      let that = this;
      var id=that.data.id;
      var table = that.data.table;
      var uid = wx.getStorageSync('uid');
      var num = that.data.val;
      var zhi=that.data.zhi;
      var zhi1 = that.data.zhi1;
      var mval = that.data.mval;
      var isval = that.data.yuan;
      console.log(that.data)
       wx.navigateTo({
         url: '../order/order?id=' + id + '&table=' + table + '&userid=' + uid + '&num=' + num + '&zhi=' + zhi + '&zhi1=' + zhi1 + '&ptype=' + that.data.alldata.p_type + '&mval=' + mval + '&isval=' + isval ,
       })
    },
    iscont: function (table,id) {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/goods/get_goods',
        method: "POST",//指定请求方式，默认get
        data: {"table":table, "id": id },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            alldata: res.data.data,
            yuan: 0,
            yuan1: 0,
            id: res.data.data.id,
            table: res.data.data.table,
            intlist: res.data.data
          })
        }
      });
    }, iscont1: function (id) {
      var that = this;
      wx.request({
        url: app.globalData.allUrl + 'api/banner/get_active',
        method: "POST",//指定请求方式，默认get
        data: {"id": id },
        header: {
          //默认值'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //post
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            alldata: res.data.data,
            yuan: res.data.data.price,
            yuan1: res.data.data.price,
            id: res.data.data.id,
            table: res.data.data.table,
            intlist: res.data.data
          })
          if (res.data.data.p_type == 1 || res.data.data.p_type == 2 || res.data.data.p_type == 3) {
            that.suda(1, 1)
          }
          if (res.data.data.p_type == 9) {
            that.suda(2, 1)
          }
        }
      });
    },
    jia:function(){
      var h=this.data.val;
      this.setData({val:h+1})
    },
    jian:function(){
      var h = this.data.val;
      if(h>1){
      this.setData({ val: h - 1 })
      }else{
        wx.showToast({
          title: '超过最小数量',
        })
      }
    },
    onLoad: function (options) {
      console.log(options.id);
      console.log(options.nuu)
      let that = this;
      if(options.table==undefined){
        that.setData({ id: options.id, nuu: options.nuu })
      }else{
        that.setData({ id: options.id, table: options.table})
      }
      if (that.data.nuu != '' && that.data.nuu != null && that.data.nuu != undefined) {
        that.iscont1(that.data.id);
      } else {
        that.iscont(that.data.table, that.data.id);
      }
    },
    onShow: function () {
      let that = this;
      
    }

  }
})
