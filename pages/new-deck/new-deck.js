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

  onNameInput(e) {
    const name = e.detail.value
    this.setData({
      deckName: name,
      canCreate: name.trim().length > 0
    })
  },

  onDescInput(e) {
    this.setData({
      deckDesc: e.detail.value
    })
  },

  selectIcon(e) {
    const icon = e.currentTarget.dataset.icon
    this.setData({
      selectedIcon: icon
    })
  },

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

    app.globalData.decks = app.globalData.decks || []
    app.globalData.decks.push(newDeck)

    wx.redirectTo({
      url: `/pages/deck-detail/deck-detail?id=${newDeck.id}`
    })
  },

  getIconBg(icon) {
    const iconItem = this.data.iconList.find(item => item.icon === icon)
    return iconItem ? iconItem.bg : '#F1F5F9'
  }
})
