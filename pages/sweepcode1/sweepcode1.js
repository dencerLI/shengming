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
    appUrl: app.globalData.allUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkedTap1: function (e) {
      var checked = this.data.checked1;
      console.log(checked);
    
      this.setData({
        checked1:!checked
      })

    },
    checkedTap2: function (e) {
      var checked = this.data.checked2;
      console.log(checked);

      this.setData({
        checked2: !checked
      })

    }
    , checkedTap3: function (e) {
      var checked = this.data.checked3;
      console.log(checked);

      this.setData({
        checked3: !checked
      })

    }
  }
})
