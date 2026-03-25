const app = getApp()

Page({
  data: {
    greeting: '',
    userInfo: null,
    decks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setGreeting()
    this.loadDecks()
    this.getUserProfile()
  },

  /**
   * 获取用户头像（新版微信 API）
   * 注意：getUserProfile 已废弃，改为使用 open-data 展示头像
   */
  getUserProfile() {
    // 新版方案：使用 open-data 展示头像，不需要授权
    // 如果需要用户信息，使用 wx.login 获取 code
    this.setData({
      userInfo: {
        avatarUrl: ''
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadDecks()
  },

  /**
   * 设置问候语
   */
  setGreeting() {
    const hour = new Date().getHours()
    let greeting = '晚上好，玩家！'
    if (hour < 12) {
      greeting = '早上好，玩家！'
    } else if (hour < 18) {
      greeting = '下午好，玩家！'
    }
    this.setData({ greeting })
  },

  /**
   * 加载卡组数据
   */
  loadDecks() {
    // 每次加载时从 globalData 获取最新数据
    const decks = app.globalData.decks || []
    this.setData({ decks })
  },

  /**
   * 跳转到新建卡组页面
   */
  goToNewDeck() {
    wx.navigateTo({
      url: '/pages/new-deck/new-deck'
    })
  },

  /**
   * 跳转到卡组详情页面
   * @param {Object} e - 事件对象
   */
  goToDeckDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/deck-detail/deck-detail?id=${id}`
    })
  }
})
