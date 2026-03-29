const app = getApp()

Page({
  data: {
    deckId: '',
    deck: {
      name: '',
      icon: '',
      cards: []
    },
    showModal: false,
    cardContent: '',
    canConfirm: false
  },

  /**
   * 生命周期函数--监听页面加载
   * @param {Object} options - 页面参数
   */
  onLoad(options) {
    this.setData({
      deckId: options.id
    })
    this.loadDeck()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadDeck()
  },

  /**
   * 加载卡组数据
   */
  loadDeck() {
    const config = wx.getStorageSync('deckConfig') || { custom: [] }
    const deck = config.custom.find(d => d.id === this.data.deckId)
    if (deck) {
      this.setData({ deck })
    }
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack()
  },

  /**
   * 打开新建卡牌模态框
   */
  openModal() {
    this.setData({
      showModal: true,
      cardContent: '',
      canConfirm: false
    })
  },

  /**
   * 关闭新建卡牌模态框
   */
  closeModal() {
    this.setData({
      showModal: false,
      cardContent: '',
      canConfirm: false
    })
  },

  /**
   * 监听卡牌内容输入
   * @param {Object} e - 事件对象
   */
  onCardInput(e) {
    const content = e.detail.value
    this.setData({
      cardContent: content,
      canConfirm: content.trim().length > 0
    })
  },

  /**
   * 添加卡牌
   */
  addCard() {
    if (!this.data.canConfirm) return

    const content = this.data.cardContent.trim()
    const config = wx.getStorageSync('deckConfig') || { custom: [] }
    const deckIndex = config.custom.findIndex(d => d.id === this.data.deckId)
    
    if (deckIndex !== -1) {
      config.custom[deckIndex].cards.push(content)
      wx.setStorageSync('deckConfig', config)
      this.setData({
        deck: config.custom[deckIndex],
        showModal: false,
        cardContent: '',
        canConfirm: false
      })
    }
  }
})
