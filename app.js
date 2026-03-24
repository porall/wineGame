App({
  onLaunch() {
    console.log('小程序启动')
    
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'your-env-id', // TODO: 替换为你的云开发环境ID
        traceUser: true
      })
    }
    
    // 加载本地存储的卡组数据
    this.loadDecks()
  },

  /**
   * 小程序显示时触发
   */
  onShow() {
    this.loadDecks()
  },

  /**
   * 小程序隐藏时触发
   */
  onHide() {
    this.saveDecks()
  },

  /**
   * 加载卡组数据
   */
  loadDecks() {
    try {
      const decks = wx.getStorageSync('userDecks') || []
      this.globalData.decks = decks
    } catch (e) {
      console.error('加载卡组失败', e)
      this.globalData.decks = []
    }
  },

  /**
   * 保存卡组数据
   */
  saveDecks() {
    try {
      wx.setStorageSync('userDecks', this.globalData.decks)
    } catch (e) {
      console.error('保存卡组失败', e)
    }
  },

  /**
   * 更新卡组数据
   */
  updateDecks(decks) {
    this.globalData.decks = decks
    this.saveDecks()
  },

  globalData: {
    userInfo: null,
    decks: []
  }
})
