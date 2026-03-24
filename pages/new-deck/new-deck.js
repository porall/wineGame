const app = getApp()

Page({
  data: {
    deckName: '',
    deckDesc: '',
    selectedIcon: '✨',
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
   * @param {Object} e - 事件对象
   */
  onNameInput(e) {
    const name = e.detail.value
    this.setData({
      deckName: name,
      canCreate: name.trim().length > 0
    })
  },

  /**
   * 监听卡组描述输入
   * @param {Object} e - 事件对象
   */
  onDescInput(e) {
    this.setData({
      deckDesc: e.detail.value
    })
  },

  /**
   * 选择图标
   * @param {Object} e - 事件对象
   */
  selectIcon(e) {
    const icon = e.currentTarget.dataset.icon
    this.setData({
      selectedIcon: icon
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
      iconBg: this.getIconBg(this.data.selectedIcon),
      description: this.data.deckDesc,
      cards: [],
      createdAt: new Date().toISOString()
    }

    // 使用 App 的方法保存数据
    app.globalData.decks = app.globalData.decks || []
    app.globalData.decks.push(newDeck)
    app.updateDecks(app.globalData.decks)

    wx.redirectTo({
      url: `/pages/deck-detail/deck-detail?id=${newDeck.id}`
    })
  },

  /**
   * 获取图标背景色
   * @param {string} icon - 图标
   * @returns {string} 背景色
   */
  getIconBg(icon) {
    const iconItem = this.data.iconList.find(item => item.icon === icon)
    return iconItem ? iconItem.bg : '#F1F5F9'
  }
})
