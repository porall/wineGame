const app = getApp()
const { cloudApi } = require('../../utils/cloud')

Page({
  data: {
    list: [],
    page: 1,
    limit: 10,
    hasMore: true,
    loading: false,
    tag: '',
    keyword: '',
    tags: ['搞笑', '真心话', '整蛊', '互动', '热门']
  },

  onLoad() {
    this.loadList()
  },

  onPullDownRefresh() {
    this.refreshList()
  },

  onReachBottom() {
    this.loadMore()
  },

  // 加载列表
  async loadList() {
    if (this.data.loading) return
    
    this.setData({ loading: true })
    
    try {
      const res = await cloudApi.getSquareList({
        page: 1,
        limit: this.data.limit,
        tag: this.data.tag,
        keyword: this.data.keyword
      })
      
      if (res.success) {
        this.setData({
          list: res.data.list,
          page: 1,
          hasMore: res.data.hasMore
        })
      } else {
        wx.showToast({ title: res.error, icon: 'none' })
      }
    } catch (err) {
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      this.setData({ loading: false })
      wx.stopPullDownRefresh()
    }
  },

  // 刷新
  refreshList() {
    this.setData({ page: 1 })
    this.loadList()
  },

  // 加载更多
  async loadMore() {
    if (!this.data.hasMore || this.data.loading) return
    
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
          list: [...this.data.list, ...res.data.list],
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
    wx.navigateTo({
      url: `/pages/square/detail?id=${id}`
    })
  },

  // 跳转到发布
  goToPublish() {
    wx.navigateTo({
      url: '/pages/square/publish'
    })
  }
})
