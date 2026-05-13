// 云开发初始化 - 小程序端直接用 wx.cloud，不需要 require
App({
  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-1g29ouujacae28f8',
        traceUser: true
      })
    }
    console.log('小程序启动')
  },
  
  // 页面跳转方法 - 用于建立代码依赖
  goToSquare() {
    wx.navigateTo({ url: '/pages/square/square' })
  },
  goToProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' })
  },
  
  globalData: {
    userInfo: null,
    openid: null,
    userId: null,
    decks: []
  }
})