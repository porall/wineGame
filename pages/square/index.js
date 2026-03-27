const app = getApp()
const { cloudApi } = require('../../utils/cloud')
const systemDecks = require('../../utils/systemDecks')

Page({
  data: {
    systemDecks: [],   // 系统卡组
    userDecks: [],     // 用户卡组
    page: 1,
    limit: 10,
    hasMore: true,
    loading: false,
    tag: '',
    keyword: '',
    activeTab: 'system',  // 'system' | 'user'
    tags: ['搞笑', '真心话', '整蛊', '互动', '热门']
  },

  onLoad() {
    // 加载系统卡组
    this.setData({ systemDecks: systemDecks })
    this.loadUserDecks()
  },

  onPullDownRefresh() {
    this.refreshList()
  },

  onReachBottom() {
    this.loadMore()
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  // 加载用户卡组
  loadUserDecks() {
    const config = wx.getStorageSync('deckConfig') || { custom: [] }
    this.setData({ userDecks: config.custom || [] })
  },

  // 刷新
  refreshList() {
    this.setData({ page: 1 })
    if (this.data.activeTab === 'system') {
      this.setData({ systemDecks: systemDecks })
    } else {
      this.loadUserDecks()
    }
  },

  // 加载更多（用户卡组分页）
  async loadMore() {
    if (!this.data.hasMore || this.data.loading || this.data.activeTab === 'system') return
    
    this.setData({ loading: true })
    
    try {
      const res = await cloudApi.getSquareList({
        page: this.data.page + 1,
        limit: this.data.limit,
        tag: this.data.tag,
        keyword: this.data.keyword
      })
      
      if (res.success) {
        this.setData({
          userDecks: [...this.data.userDecks, ...res.data.list],
          page: this.data.page + 1,
          hasMore: res.data.hasMore
        })
      }
    } catch (err) {
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 搜索
  onSearch(e) {
    this.setData({ keyword: e.detail.value })
    this.refreshList()
  },

  // 选择标签
  onSelectTag(e) {
    const tag = e.currentTarget.dataset.tag
    this.setData({ tag: this.data.tag === tag ? '' : tag })
    this.refreshList()
  },

  // 跳转到详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    const isSystem = e.currentTarget.dataset.system
    
    if (isSystem) {
      // 系统卡组：传参跳转
      wx.navigateTo({
        url: `/pages/square/detail?id=${id}&isSystem=1`
      })
    } else {
      wx.navigateTo({
        url: `/pages/square/detail?id=${id}`
      })
    }
  },

  // 跳转到发布
  goToPublish() {
    wx.navigateTo({
      url: '/pages/square/publish'
    })
  }
})