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
    const decks = app.globalData.decks || []
    const deck = decks.find(d => d.id === this.data.deckId)
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
    let decks = app.globalData.decks || []
    const deckIndex = decks.findIndex(d => d.id === this.data.deckId)
    
    if (deckIndex !== -1) {
      decks[deckIndex].cards.push(content)
      // 使用 App 的方法保存数据
      app.updateDecks(decks)
      this.setData({
        deck: decks[deckIndex],
        showModal: false,
        cardContent: '',
        canConfirm: false
      })
    }
  }
})
