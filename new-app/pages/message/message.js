// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listShow: true,
    articleList: [
      {
        id:'1',
        url:'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital:'丢失的树叶',
        content:'在小湖边捡到的树叶，找失主！'
      },
      {
        id: '2',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '在小湖边捡到的树叶，找失主！'
      },
      {
        id: '3',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '在小湖边捡到的树叶，找失主！'
      },
      {
        id: '4',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '在小湖边捡到的树叶，找失主！'
      },
      {
        id: '5',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '在小湖边捡到的树叶，找失主！'
      },
    ],
    articleLists: [
      {
        id: '1',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '我的树叶丢了，有人找到嘛！'
      },
      {
        id: '2',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '我的树叶丢了，有人找到嘛！'
      },
      {
        id: '3',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '我的树叶丢了，有人找到嘛！'
      },
      {
        id: '4',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '我的树叶丢了，有人找到嘛！'
      },
      {
        id: '5',
        url: 'https://static.dingtalk.com/media/lADPDgQ9qkuRuDDNA1_NA0g_840_863.jpg',
        tital: '丢失的树叶',
        content: '我的树叶丢了，有人找到嘛！'
      },
    ],
    
  },
  find:function(e){
    var that = this;
    let type = e.currentTarget.dataset['type'];
    if (type === '1'){
      that.setData({
        listShow: true
      })
    }else{
      that.setData({
        listShow: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})