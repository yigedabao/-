// pages/home/home.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    forumList: [],
    inputVal: '',
    page: 1,
  },
  search: function(){
    this.getFroumList(this.data.inputVal)
  },
  cancel(){
    this.setData({
      inputVal: ''
    })
    this.getFroumList(this.data.inputVal)
  },
  inputTyping: function(e){
    this.setData({
      inputVal: e.detail.value
    })
  },
  seeDetails: function(e) {
    let postNo = e.currentTarget.dataset['postno'];
    wx.navigateTo({
      url: '../home/details?postNo=' + postNo
    })
  },
  getFroumList: function (inputVal){
    let param = {
      lostName: inputVal,
      pageSize: 10,
      postName: 1,
      page: 1
    }
    api._get('/post/list',param).then(res => {
      if (res.success) {
        this.setData({
          forumList: res.returnData
        })
      } else {
        console.log('服务器异常');
      }
    })
  },
  onLoad: function (options) {
    this.getFroumList(this.data.inputVal)
  },
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    let param = {
      lostName: this.data.inputVal,
      pageSize: 10,
      postName: 1,
      page: this.data.page
    }
    api._get('/post/list', param).then(res => {
      if (res.success) {
        this.setData({
          forumList: that.forumList.concat(res.data.returnData)
        })
      } else {
        console.log('服务器异常');
      }
    })
    // this.getForumList(this.data.inputVal, this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})