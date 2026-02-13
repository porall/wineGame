const app = getApp()

Page({
  data: {
    greeting: '',
    userInfo: null,
    decks: []
  },

  onLoad() {
    this.setGreeting()
    this.loadDecks()
  },

  onShow() {
    this.loadDecks()
  },

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

  loadDecks() {
    const decks = app.globalData.decks || []
    this.setData({ decks })
  },

  goToNewDeck() {
    wx.navigateTo({
      url: '/pages/new-deck/new-deck'
    })
  },

  goToDeckDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/deck-detail/deck-detail?id=${id}`
    })
  }
})
