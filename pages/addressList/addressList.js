// pages/addressList/addressList.js
import util from '../../utils/util.js';
import data from '../../data/list.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: {},
  },

  onLoad: function(options) {
    this.resovleData();
  },

  resovleData() {
    let list = data.addressList;
    let title = [];
    for (var i in list) {
      list[i].length > 0 && title.push(i);
      if (list[i].length === 0)  delete list[i];
      list[i] && list[i].map(item => {
        switch(item.sex) {
          case 'F':
            item.sexIcon = '../../resources/images/female_icon.png';
            item.face = item.face ? item.face : '../../resources/images/female_face.png';
            break;
          case 'M':
            item.sexIcon = '../../resources/images/male_icon.png';
            item.face = item.face ? item.face : '../../resources/images/male_face.png';
            break;
          default:
            item.sexIcon = '../../resources/images/female_icon.png';
            item.face = item.face ? item.face : '../../resources/images/female_face.png';         
        }
        item.time = util.formatTime(new Date(item.createTime), false)
      })
    }
    this.setData({
      addressList: list,
      title: title,
      fixedTitle: title[0]
    })
    this.autoHeight();
  },

  // onShow() {
  //   this.autoHeight();
  // },

  autoHeight() {
    let heightArr = [];
    this.data.title.forEach((item, index) => {
      wx.createSelectorQuery()
        .select('#view_' + item).boundingClientRect()
        .exec(res => {
          heightArr.push(res[0].top)
          if (index === this.data.title.length - 1) this.setData({ heightArr: heightArr});
        })
    })
  },

  // 字母导航
  selectTitle(e) {
    let dataset = e.currentTarget.dataset;
    this.setData({
      viewTitle: 'view_' + dataset.name,
      fixedTitle: dataset.name
    })
  },

  scroll(e) {
    let top = e.detail.scrollTop;
    let heightArr = this.data.heightArr;
    for (var i = 0; i < heightArr.length; i++) {
      if (top < heightArr[i]) {
        if (!this.data.title[i - 1] || this.data.title[i - 1] === this.data.fixedTitle ) return;
        this.setData({
          fixedTitle: this.data.title[i - 1]
        })
        return;
      } else if (top === heightArr[i]) {
        this.setData({
          fixedTitle: this.data.title[i]
        })
      }
    }
    // heightArr.forEach((item, index) => {
    //   if (top <= heightArr[index]) return console.log(top, heightArr[index], index)
    //   console.log(111)
    // })
  }
})