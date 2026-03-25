/**
 * 云函数封装
 */
const cloud = wx.cloud

const cloudApi = {
  /**
   * 获取广场卡组列表
   */
  getSquareList: function(data = {}) {
    return cloud.callFunction({
      name: 'getSquareList',
      data: data
    })
  },

  /**
   * 获取卡组详情
   */
  getDeckDetail: function(deckId) {
    return cloud.callFunction({
      name: 'getDeckDetail',
      data: { deckId: deckId }
    })
  },

  /**
   * 发布卡组
   */
  publishDeck: function(data) {
    return cloud.callFunction({
      name: 'publishDeck',
      data: data
    })
  },

  /**
   * 收藏/取消收藏
   */
  likeDeck: function(deckId) {
    return cloud.callFunction({
      name: 'likeDeck',
      data: { deckId: deckId }
    })
  },

  /**
   * 使用卡组（导入到本地）
   */
  useDeck: function(deckId) {
    return cloud.callFunction({
      name: 'useDeck',
      data: { deckId: deckId }
    })
  },

  /**
   * 添加评论
   */
  addComment: function(deckId, content) {
    return cloud.callFunction({
      name: 'addComment',
      data: { deckId: deckId, content: content }
    })
  }
}

module.exports = {
  cloudApi: cloudApi
}
