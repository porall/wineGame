const app = getApp()
const { cloudApi } = require('../../utils/cloud')

Page({
  data: {
    name: '',
    description: '',
    selectedIcon: '✨',
    selectedTags: [],
    cards: [],
    cardInput: '',
    canPublish: false,
    icons: [
      { icon: '✨', bg: '#FEF3C7' },
      { icon: '❤️', bg: '#FEE2E2' },
      { icon: '⭐', bg: '#FEF3C7' },
      { icon: '🔥', bg: '#FEE2E2' },
      { icon: '🌙', bg: '#DBEAFE' },
      { icon: '🏆', bg: '#D1FAE5' },
      { icon: '👻', bg: '#F3E8FF' },
      { icon: '🎵', bg: '#E0E7FF' }
    ],
    tags: ['搞笑', '真心话', '整蛊', '互动', '聚会', '热门']
  },

  // 名称输入
  onNameInput(e) {
    this.setData({
      name: e.detail.value,
      canPublish: this.checkCanPublish()
    })
  },

  // 描述输入
  onDescInput(e) {
    this.setData({ description: e.detail.value })
  },

  // 选择图标
  selectIcon(e) {
    const icon = e.currentTarget.dataset.icon
    const iconItem = this.data.icons.find(i => i.icon === icon)
    this.setData({ selectedIcon: icon, selectedIconBg: iconItem.bg })
  },

  // 选择标签
  toggleTag(e) {
    const tag = e.currentTarget.dataset.tag
    const tags = this.data.selectedTags
    if (tags.includes(tag)) {
      this.setData({ selectedTags: tags.filter(t => t !== tag) })
    } else if (tags.length < 3) {
      this.setData({ selectedTags: [...tags, tag] })
    }
    this.setData({ canPublish: this.checkCanPublish() })
  },

  // 卡牌输入
  onCardInput(e) {
    this.setData({ cardInput: e.detail.value })
  },

  // 添加卡牌
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
      canPublish: this.checkCanPublish()
    })
  },

  // 删除卡牌
  deleteCard(e) {
    const index = e.currentTarget.dataset.index
    const cards = [...this.data.cards]
    cards.splice(index, 1)
    this.setData({ cards, canPublish: this.checkCanPublish() })
  },

  // 检查是否能发布
  checkCanPublish() {
    return this.data.name.trim().length > 0 && this.data.cards.length > 0
  },

  // 发布
  async publish() {
    if (!this.data.canPublish) return
    
    wx.showLoading({ title: '发布中...' })
    
    try {
      const res = await cloudApi.publishDeck({
        name: this.data.name.trim(),
        description: this.data.description.trim(),
        icon: this.data.selectedIcon,
        iconBg: this.data.selectedIconBg || '#FEF3C7',
        tags: this.data.selectedTags,
        cards: this.data.cards,
        isPublic: true
      })
      
      if (res.success) {
        wx.showToast({ title: '发布成功', icon: 'success' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        wx.showToast({ title: res.error, icon: 'none' })
      }
    } catch (err) {
      wx.showToast({ title: '发布失败', icon: 'none' })
    } finally {
      wx.hideLoading()
    }
  }
})
