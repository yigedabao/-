// pages/home/details.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    text: '',
    postNo: '',
    postUrlList: [],
    commentList:[
      {
        name: '一个大包',
        content: '作者好厉害！'
      },
      {
        name: '一个大包2',
        content: '作者好厉害！'
      },
      {
        name: '一个大包3',
        content: '作者好厉害！'
      },
    ],
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      postNo: options.postNo
    })
    let param = {
      postNO: options.postNo,
    }
    api._get('/post/details', param).then(res => {
      console.log(res.returnData.postUrlList)
      let imgarr = res.returnData.postUrlList
      let imgarr2 = imgarr.map((n,i)=>{
        // n = api.baseUrl + n.slice(6)
        n = 'http://' + n

        return n
      })
      if (res.success) {
        this.setData({
          title: res.returnData.postName,
          text: res.returnData.postDetail,
          postUrlList: this.data.postUrlList.concat(imgarr2)
        })
      } else {
        console.log('服务器异常');
      }
    })
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  release:function(){
    const skey = JSON.parse(wx.getStorageSync('skey'))
    const nickName = wx.getStorageSync('userInfo').nickName
    let param = {
      openNo: skey.openId,
      userNo: skey.userNo,
      userName: nickName,
      lostArticleNo: this.data.postNo,
      lostArticleCommentContent: this.data.inputVal,
    }
    api._post('/ques/insertComment', param).then(res => {
      console.log(res)
      if (res.success) {
        this.setData({
          inputVal: ''
        })
      } else {
        console.log('服务器异常');
      }
    })
  }
})