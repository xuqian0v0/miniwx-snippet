// components/picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    maskShow: true,
    ready: false,
  },

  attached() {
    this.setData({
      ready: true,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindchange(e) {
      this.setData({
        selected: e.detail.value
      })
    },

    // 点击取消
    cancel() {
      this.setData({
        maskShow: false
      })
      this.triggerEvent('hiddenPicker');
    },

    confirm() {
      this.setData({
        maskShow: false
      })
      this.triggerEvent('hiddenPicker');
      this.triggerEvent('pickerChange', this.data.selected);
    }
  }
})
