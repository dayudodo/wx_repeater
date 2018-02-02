//index.js
//获取应用实例
var initAudio = require('init_audio')
const app = getApp()
// const hostName = 'http://192.168.2.200:3000'
const hostName = 'http://www.gsenglish.cn'

Page({
  onReady: function (e) {
    initAudio(this, 'myAudio')
  },
  data: {
    name: 'e301',
    author: 'ange',
    

    sentences:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getJson() {
    wx.request({
      url: `${hostName}/newconcept/show/23.json`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res=>{
        console.log(res.data.sentences)
        this.setData({sentences: res.data.sentences})
      }
    })
  },
  playMe(e){
    let name = e.currentTarget.dataset.name
    
    let soundFileName = `${hostName}${name}`
    console.log(soundFileName)
    // this.setData({src: soundFileName})
    this.audioCtx.src = soundFileName
    this.audioCtx.play()
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },

})
