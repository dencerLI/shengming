// pages/Apply/Apply.js
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
    iscolor:"#E65C10",
    checked3: false,
    back:"#666",
    isnone:"none",
    second:5
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkedTap3: function (e) {
      var checked = this.data.checked3;
      console.log(checked)
        this.setData({
          "checked3": !checked,
        })
        if(checked==true){
          this.setData({ back: "#666" })
        }else{
          this.setData({ back: "#FF6406" })
        }
    },
    applygo:function(){
      var that=this;
      var checked = this.data.checked3;
      console.log(checked)
      if (checked == true){
      that.setData({isnone:"block"})
     
      var miao=setInterval(function(){
        var second = that.data.second;
        if (second>0){
          var second1 = second-1;
          console.log(second1)
        that.setData({ second: second1})
        }else{
          that.goindex();
          clearInterval(miao); 
        }
      },1000)
      }
    },
    goindex: function () {
      wx.switchTab({
        url: '../index/index'
      })
    }
  }
})
