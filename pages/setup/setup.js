// pages/setup/setup.js
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
    selectData:["东北二龙湖","北京三里屯"],
    selectShow: false,
    index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击下拉列表
    optionTap(e) {
      let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      
      this.setData({
        index: Index,
        selectShow: !this.data.selectShow
      });
    },
    selectTap() {
      this.setData({
        selectShow: !this.data.selectShow
      });
    }
  }
})
