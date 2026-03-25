/**
 * 云函数封装
 * 注意：小程序中 wx.cloud 已在 app.js 中初始化
 */
var cloudApi = {
  getSquareList: function(data) {
    return wx.cloud.callFunction({
      name: 'getSquareList',
      data: data || {}
    })
  },

  getDeckDetail: function(deckId) {
    return wx.cloud.callFunction({
      name: 'getDeckDetail',
      data: { deckId: deckId }
    })
  },

  publishDeck: function(data) {
    return wx.cloud.callFunction({
      name: 'publishDeck',
      data: data
    })
  },

  likeDeck: function(deckId) {
    return wx.cloud.callFunction({
      name: 'likeDeck',
      data: { deckId: deckId }
    })
  },

  useDeck: function(deckId) {
    return wx.cloud.callFunction({
      name: 'useDeck',
      data: { deckId: deckId }
    })
  },

  addComment: function(deckId, content) {
    return wx.cloud.callFunction({
      name: 'addComment',
      data: { deckId: deckId, content: content }
    })
  }
}

module.exports = {
  cloudApi: cloudApi
}
