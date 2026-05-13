// pages/square/square.js
Page({
  data: {
    // 搜索
    searchQuery: '',
    // Tab
    currentTab: 'latest',
    tabs: [
      { key: 'latest', name: '最新' },
      { key: 'hot', name: '热门' },
      { key: 'recommend', name: '推荐' }
    ],
    // 卡组列表
    decks: [],
    // 分页
    page: 1,
    pageSize: 10,
    hasMore: true,
    // 加载状态
    loading: false,
    // 空状态
    empty: false,
    // 是否下拉刷新中
    refreshing: false
  },

  onLoad() {
    this.loadDecks();
  },

  onShow() {
    // 每次显示时刷新
    this.setData({ page: 1, decks: [] });
    this.loadDecks();
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ page: 1, decks: [], refreshing: true });
    this.loadDecks().finally(() => {
      wx.stopPullDownRefresh();
      this.setData({ refreshing: false });
    });
  },

  // 加载卡组列表
  loadDecks() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    const db = wx.cloud.database();
    const collection = db.collection('decks');
    
    // 构建查询条件
    let query = { status: 'approved' };
    
    // 根据 tab 选择排序
    let orderField = this.getOrderBy();
    
    collection.where(query)
      .orderBy(orderField, 'desc')
      .skip((this.data.page - 1) * this.data.pageSize)
      .limit(this.data.pageSize)
      .get()
      .then(res => {
        const newDecks = res.data;
        // 添加标识
        newDecks.forEach(deck => {
          deck.isFromSquare = true;
        });
        
        this.setData({
          decks: [...this.data.decks, ...newDecks],
          page: this.data.page + 1,
          hasMore: newDecks.length >= this.data.pageSize,
          empty: this.data.decks.length === 0 && newDecks.length === 0
        });
      })
      .catch(err => {
        console.error('loadDecks error:', err);
        this.setData({ empty: true });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  },

  // 获取排序方式
  getOrderBy() {
    const map = {
      latest: 'createdAt',
      hot: 'downloads',
      recommend: 'likes'
    };
    return map[this.data.currentTab] || 'createdAt';
  },

  // Tab 切换
  onTabChange(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.currentTab) return;
    
    this.setData({
      currentTab: tab,
      decks: [],
      page: 1,
      hasMore: true
    });
    this.loadDecks();
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchQuery: e.detail.value });
  },

  // 搜索
  onSearch() {
    if (!this.data.searchQuery.trim()) {
      wx.showToast({ title: '请输入搜索词', icon: 'none' });
      return;
    }
    
    this.setData({ 
      page: 1, 
      decks: [], 
      loading: true 
    });
    
    const db = wx.cloud.database();
    const _ = db.command;
    const searchKey = this.data.searchQuery.trim();
    
    db.collection('decks').where({
      status: 'approved',
      name: db.RegExp({
        regexp: searchKey,
        options: 'i'
      })
    })
    .orderBy(this.getOrderBy(), 'desc')
    .limit(this.data.pageSize)
    .get()
    .then(res => {
      const newDecks = res.data;
      newDecks.forEach(deck => {
        deck.isFromSquare = true;
      });
      
      this.setData({
        decks: newDecks,
        hasMore: false,
        empty: newDecks.length === 0
      });
    })
    .catch(err => {
      console.error('search error:', err);
    })
    .finally(() => {
      this.setData({ loading: false });
    });
  },

  // 下拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.searchQuery) {
      this.loadDecks();
    }
  },

  // 跳转卡组详情
  goToDetail(e) {
    const deckId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/deck-detail/deck-detail?id=${deckId}`
    });
  },

  // 跳转创建卡组
  goToCreate() {
    wx.navigateTo({
      url: '/pages/new-deck/new-deck'
    });
  },

  // 点赞
  onLike(e) {
    const deckId = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    
    wx.cloud.callFunction({
      name: 'likeDeck',
      data: { deckId }
    }).then(res => {
      if (res.result && res.result.success) {
        const decks = this.data.decks;
        decks[index].likes = (decks[index].likes || 0) + 1;
        this.setData({ decks });
        wx.showToast({ title: '点赞成功', icon: 'success' });
      }
    }).catch(err => {
      console.error('like error:', err);
    });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '酒桌游戏 - 聚会破冰神器',
      path: '/pages/index/index'
    };
  }
});