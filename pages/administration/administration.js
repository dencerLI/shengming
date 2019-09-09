// pages/administration/administration.js
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
     yes:'',
    items: [
      { name: 'yes', value: '中国', checked: 'true' },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      this.setData({
        yes: e.detail.value
      })
    }
  }
})
