/**
 * 云函数封装
 */
const cloud = wx.cloud

export const cloudApi = {
  /**
   * 获取广场卡组列表
   * @param {Object} data - { page, limit, tag, keyword }
   */
  getSquareList: (data = {}) => {
    return cloud.callFunction({
      name: 'getSquareList',
      data
    })
  },

  /**
   * 获取卡组详情
   * @param {string} deckId - 卡组ID
   */
  getDeckDetail: (deckId) => {
    return cloud.callFunction({
      name: 'getDeckDetail',
      data: { deckId }
    })
  },

  /**
   * 发布卡组
   * @param {Object} data - 卡组数据
   */
  publishDeck: (data) => {
    return cloud.callFunction({
      name: 'publishDeck',
      data
    })
  },

  /**
   * 收藏/取消收藏
   * @param {string} deckId - 卡组ID
   */
  likeDeck: (deckId) => {
    return cloud.callFunction({
      name: 'likeDeck',
      data: { deckId }
    })
  },

  /**
   * 使用卡组（导入到本地）
   * @param {string} deckId - 卡组ID
   */
  useDeck: (deckId) => {
    return cloud.callFunction({
      name: 'useDeck',
      data: { deckId }
    })
  },

  /**
   * 添加评论
   * @param {string} deckId - 卡组ID
   * @param {string} content - 评论内容
   */
  addComment: (deckId, content) => {
    return cloud.callFunction({
      name: 'addComment',
      data: { deckId, content }
    })
  }
}
