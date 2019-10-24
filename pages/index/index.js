const app = getApp()

Page({
  data: {
    pickerShow: false
  },

  onLoad: function () {
    let options = {
      columns: [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4], [1, 2, 3, 4], ['饭前', '饭后', '晨起']],
      selected: [4, 1, 2, 0],
      titleArr: ['剂量', '每日几剂', '1剂分几次', '用法']
    }
    this.setData({
      options: options
    })
  },

  showPicker() {
    this.setData({
      pickerShow: true
    })
  },

  hiddenPicker() {
    this.setData({
      pickerShow: false
    })
  },

  pickerChange(e) {
    if (!e.detail) return;
    console.log(e.detail)
    let key = 'options.selected';
    this.setData({
      [key]: e.detail
    })
  },

  addressList() {
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },
})
