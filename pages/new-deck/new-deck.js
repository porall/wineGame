const app = getApp()

Page({
  data: {
    deckName: '',
    deckDesc: '',
    selectedIcon: '✨',
    selectedIconBg: '#FEF3C7',
    cardInput: '',
    cards: [],
    canCreate: false,
    iconList: [
      { icon: '✨', bg: '#FEF3C7' },
      { icon: '❤️', bg: '#FEE2E2' },
      { icon: '⭐', bg: '#FEF3C7' },
      { icon: '🔥', bg: '#FEE2E2' },
      { icon: '🌙', bg: '#DBEAFE' },
      { icon: '🏆', bg: '#D1FAE5' },
      { icon: '👻', bg: '#F3E8FF' },
      { icon: '🎵', bg: '#E0E7FF' }
    ]
  },

  /**
   * 监听卡组名称输入
   */
  onNameInput(e) {
    const name = e.detail.value
    this.setData({
      deckName: name,
      canCreate: name.trim().length > 0 && this.data.cards.length > 0
    })
  },

  /**
   * 监听卡组描述输入
   */
  onDescInput(e) {
    this.setData({
      deckDesc: e.detail.value
    })
  },

  /**
   * 选择图标
   */
  selectIcon(e) {
    const icon = e.currentTarget.dataset.icon
    const iconItem = this.data.iconList.find(i => i.icon === icon)
    this.setData({
      selectedIcon: icon,
      selectedIconBg: iconItem.bg
    })
  },

  /**
   * 监听卡牌输入
   */
  onCardInput(e) {
    this.setData({ cardInput: e.detail.value })
  },

  /**
   * 添加卡牌
   */
  addCard() {
    const card = this.data.cardInput.trim()
    if (!card) return
    if (this.data.cards.length >= 100) {
      wx.showToast({ title: '最多100张', icon: 'none' })
      return
    }
    this.setData({
      cards: [...this.data.cards, card],
      cardInput: '',
      canCreate: this.data.deckName.trim().length > 0 && this.data.cards.length > 0
    })
  },

  /**
   * 删除卡牌
   */
  deleteCard(e) {
    const index = e.currentTarget.dataset.index
    const cards = [...this.data.cards]
    cards.splice(index, 1)
    this.setData({
      cards,
      canCreate: this.data.deckName.trim().length > 0 && cards.length > 0
    })
  },

  /**
   * 创建卡组
   */
  createDeck() {
    if (!this.data.canCreate) return

    const newDeck = {
      id: Date.now().toString(),
      name: this.data.deckName.trim(),
      icon: this.data.selectedIcon,
      iconBg: this.data.selectedIconBg || '#FEF3C7',
      description: this.data.deckDesc,
      cards: this.data.cards,
      createdAt: new Date().toISOString()
    }

    // 使用 App 的方法保存数据
    app.globalData.decks = app.globalData.decks || []
    app.globalData.decks.push(newDeck)
    app.updateDecks(app.globalData.decks)

    wx.redirectTo({
      url: `/pages/deck-detail/deck-detail?id=${newDeck.id}`
    })
  }
})
