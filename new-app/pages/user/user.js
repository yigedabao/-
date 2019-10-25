//index.js
const api = require('../../utils/api.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (wx.getStorageSync('skey')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function (e) {
    const userInfo = e.detail.userInfo
    var that = this
    if (userInfo) {
      // 1. 小程序通过wx.login()获取code
      wx.login({
        success: function (login_res) {
          //获取用户信息
          wx.getUserInfo({
            success: function (info_res) {
              // 2. 小程序通过wx.request()发送code到开发者服务器
              let param = {
                code: login_res.code, //临时登录凭证
                rawData: info_res.rawData, //用户非敏感信息
                signature: info_res.signature, //签名
                encrypteData: info_res.encryptedData, //用户敏感信息
                iv: info_res.iv //解密算法的向量
              }
              api._post('/wx/login', param).then(res => {
                if (res.success) {
                  wx.setStorageSync('userInfo', userInfo);
                  wx.setStorageSync('skey', JSON.stringify(res.returnData));
                  that.setData({
                    userInfo: userInfo,
                    hasUserInfo: true
                  })
                } else {
                  console.log('服务器异常');
                }
              })
            }
          })
        }
      })
    }
  }
})
