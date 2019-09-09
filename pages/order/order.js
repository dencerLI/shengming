// pages/order/order.js
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
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['干净，健康', '包装精美', '方便，新颖'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    items: [
      { name: 'yes', value: '中国', checked: 'true' },
    ],
    yes:'',
    mou:"none",
    mou1: "none"
  }
  ,
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
      let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index: Index,
        selectShow: !this.data.selectShow
      });
    },
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      this.setData({
        yes:e.detail.value
      })
    }
    ,
    yinsi: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      this.setData({
        mou1: 'block'
      })
    },
    tui:function(){
      this.setData({
        mou: 'block'
      })
    },
    guan:function(){
      this.setData({mou:"none",mou1:"none"})
    },
    kong: function () {
      
    }
  }
})
