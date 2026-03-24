const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command

// 获取卡组详情
exports.main = async (event, context) => {
  const { deckId } = event

  if (!deckId) {
    return { success: false, error: '缺少卡组ID' }
  }

  try {
    // 获取卡组详情
    const deckRes = await db.collection('decks')
      .doc(deckId)
      .get()

    if (!deckRes.data) {
      return { success: false, error: '卡组不存在' }
    }

    // 浏览量 +1（原子操作）
    await db.collection('decks')
      .doc(deckId)
      .update({
        data: {
          views: _.inc(1)
        }
      })

    // 获取当前用户是否已收藏
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID

    let isLiked = false
    if (openid) {
      const likeRes = await db.collection('likes')
        .where({
          deckId: deckId,
          _openid: openid
        })
        .get()
      
      isLiked = likeRes.data.length > 0
    }

    return {
      success: true,
      data: {
        ...deckRes.data,
        isLiked: isLiked
      }
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
