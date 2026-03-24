const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command

// 收藏/取消收藏卡组
exports.main = async (event, context) => {
  const { deckId } = event

  if (!deckId) {
    return { success: false, error: '缺少卡组ID' }
  }

  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  if (!openid) {
    return { success: false, error: '请先登录' }
  }

  try {
    // 检查是否已收藏
    const likeRes = await db.collection('likes')
      .where({
        deckId: deckId,
        _openid: openid
      })
      .get()

    const isLiked = likeRes.data.length > 0

    if (isLiked) {
      // 取消收藏
      await db.collection('likes')
        .doc(likeRes.data[0]._id)
        .remove()

      // 收藏数 -1
      await db.collection('decks')
        .doc(deckId)
        .update({
          data: {
            likes: _.inc(-1)
          }
        })

      // 获取最新收藏数
      const deckRes = await db.collection('decks').doc(deckId).get()

      return {
        success: true,
        data: {
          liked: false,
          likes: deckRes.data.likes || 0
        }
      }
    } else {
      // 添加收藏
      await db.collection('likes').add({
        data: {
          deckId: deckId,
          _openid: openid,
          createdAt: db.serverDate()
        }
      })

      // 收藏数 +1
      await db.collection('decks')
        .doc(deckId)
        .update({
          data: {
            likes: _.inc(1)
          }
        })

      // 获取最新收藏数
      const deckRes = await db.collection('decks').doc(deckId).get()

      return {
        success: true,
        data: {
          liked: true,
          likes: deckRes.data.likes || 0
        }
      }
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
