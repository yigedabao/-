// pages/user/release.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleCount: 0, //标题字数
    contentCount: 0, //正文字数
    title: '', //标题内容
    content: '', //正文内容
    images: [],
    cbimgs:[]
  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.setData({
      title: value,
      titleCount: value.length //计算已输入的标题字数
    })
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.setData({
      content: value,
      contentCount: value.length //计算已输入的正文字数
    })
  },

  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
      }
    })
  },
  removeImage(e) {
    const idx = e.currentTarget.dataset['idx']
    let arr = this.data.images
    arr.splice(idx, 1)
    this.setData({
      images: arr
    })
  },
  oneUpload(imgPaths, currentIndx) {
    var t = this
    // console.log('正在上传第' + (currentIndx + 1) + '张图片')
    wx.uploadFile({
      // url: 'https://47.99.185.55:8082/post/fileUpload',
      url: api.baseUrl + '/post/fileUpload',
      filePath: imgPaths[currentIndx],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function(res) {
        // console.log('第' + (currentIndx + 1) + '张图片上传成功')
        const arr = []
        arr[0] = JSON.parse(res.data).returnData
        t.setData({
          cbimgs: t.data.cbimgs.concat(arr)
        })
        // 判断是否还有需要上传的图片
        if (currentIndx + 1 < imgPaths.length) {
          // 继续上传下一张图片
          t.oneUpload(imgPaths, currentIndx + 1)
        } else {
          // console.log('所有图片上传成功')
          t.articleRelease(t.data.cbimgs)
        }
      },
      fail: function(res) {
        console.log('第' + (currentIndx + 1) + '张图片上传失败')
      }
    })
  },
  articleRelease(cbimgs) {
    var that = this
    const title = this.data.title
    const content = this.data.content
    const skey = JSON.parse(wx.getStorageSync('skey'))
    const postUrl = cbimgs.join("|")
    const param = JSON.stringify({
      openNo: skey.openId,
      userNo: skey.userNo,
      postName: that.data.title,
      postDetail: that.data.content,
      postUrl: postUrl
    })
    api._post('/post/insert', param).then(res => {
      if (res.success) {
        console.log('chenggong')
      } else {
        console.log('服务器异常');
      }
    })

    // wx.request({
    //   url: 'http://47.99.185.55:8081/post/insert',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   data: params,
    //   success: function(res) {
    //     console.log(111,res)
    //   },
    //   fail: function(error) {
    //     console.log(error);
    //   }
    // })
  },
  submitForm(e) {
    const imgPaths = this.data.images;
    const currentIndx = 0;
    this.oneUpload(imgPaths, currentIndx)
  },
})