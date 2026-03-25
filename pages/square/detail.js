const app = getApp()
const { cloudApi } = require('../../utils/cloud')

Page({
  data: {
    deckId: '',
    deck: null,
    loading: true,
    isLiked: false,
    isUsed: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ deckId: options.id })
      this.loadDetail()
    }
  },

  async loadDetail() {
    this.setData({ loading: true })
    try {
      const res = await cloudApi.getDeckDetail(this.data.deckId)
      if (res.success) {
        this.setData({
          deck: res.data,
          isLiked: res.data.isLiked || false
        })
      }
    } catch (err) {
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      this.setData({ loading: false })
    }
  },

  goBack() {
    wx.navigateBack()
  },

  async toggleLike() {
    try {
      const res = await cloudApi.likeDeck(this.data.deckId)
      if (res.success) {
        this.setData({ isLiked: !this.data.isLiked })
      }
    } catch (err) {
      wx.showToast({ title: '操作失败', icon: 'none' })
    }
  },

  async useDeck() {
    wx.showLoading({ title: '导入中...' })
    try {
      const res = await cloudApi.useDeck(this.data.deckId)
      if (res.success) {
        this.setData({ isUsed: true })
        wx.showToast({ title: '已导入到卡组', icon: 'success' })
      }
    } catch (err) {
      wx.showToast({ title: '导入失败', icon: 'none' })
    } finally {
      wx.hideLoading()
    }
  },

  onShareAppMessage() {
    return {
      title: this.data.deck.name,
      path: `/pages/square/detail?id=${this.data.deckId}`,
      imageUrl: '/images/logo.png'
    }
  }
})
