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
    val:1,
    dis:'none',
    id:'',
    table:'',
    intlist:'',
    qie:'block',
    qie1:"block",
    class1:'hei',
    class2: 'hei1',
    class3: 'hei',
    class4: 'hei1',
    zhi:'35',
    zhi1:'苏打水',
    nuu:''
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
     },
    shuiji:function(e){
      let that=this;
      console.log(e.currentTarget.dataset.val)
      let onbtn = e.currentTarget.dataset.val;
      let text = e.currentTarget.dataset.zhi;
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
      }

      if (onbtn == "4") {
        that.setData({
          class4: 'hei1',
          class3: 'hei',
          zhi1: text
        })
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
       wx.navigateTo({
         url: '../order/order?id=' + id + '&table=' + table + '&userid=' + uid + '&num=' + num + '&zhi=' + zhi + '&zhi1=' + zhi1 + '&ptype=' + that.data.alldata.p_type,
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
            id: res.data.data.id,
            table: res.data.data.table,
            intlist: res.data.data
          })
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
    },
    onShow: function () {

      let that = this;
      if (that.data.nuu != '' && that.data.nuu != null && that.data.nuu != undefined){
        that.iscont1(that.data.id);
      }else{
        that.iscont(that.data.table, that.data.id);
      }
    }

  }
})
