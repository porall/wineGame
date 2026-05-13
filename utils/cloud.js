/**
 * 云函数封装
 * 注意：小程序中 wx.cloud 已在 app.js 中初始化
 */
var cloudApi = {
  useDeck: function(deckId) {
    return wx.cloud.callFunction({
      name: 'useDeck',
      data: { deckId: deckId }
    })
  }
}

module.exports = {
  cloudApi: cloudApi
}