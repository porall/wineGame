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

  onLoad(options) {
    this.setData({
      deckId: options.id
    })
    this.loadDeck()
  },

  onShow() {
    this.loadDeck()
  },

  loadDeck() {
    const decks = app.globalData.decks || []
    const deck = decks.find(d => d.id === this.data.deckId)
    if (deck) {
      this.setData({ deck })
    }
  },

  goBack() {
    wx.navigateBack()
  },

  openModal() {
    this.setData({
      showModal: true,
      cardContent: '',
      canConfirm: false
    })
  },

  closeModal() {
    this.setData({
      showModal: false,
      cardContent: '',
      canConfirm: false
    })
  },

  onCardInput(e) {
    const content = e.detail.value
    this.setData({
      cardContent: content,
      canConfirm: content.trim().length > 0
    })
  },

  addCard() {
    if (!this.data.canConfirm) return

    const content = this.data.cardContent.trim()
    const decks = app.globalData.decks || []
    const deckIndex = decks.findIndex(d => d.id === this.data.deckId)
    
    if (deckIndex !== -1) {
      decks[deckIndex].cards.push(content)
      app.globalData.decks = decks
      this.setData({
        deck: decks[deckIndex],
        showModal: false,
        cardContent: '',
        canConfirm: false
      })
    }
  }
})
