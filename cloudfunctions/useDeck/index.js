const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command

// 使用卡组（导入到自己卡组）
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
    // 获取卡组详情
    const deckRes = await db.collection('decks')
      .doc(deckId)
      .get()

    if (!deckRes.data) {
      return { success: false, error: '卡组不存在' }
    }

    // 使用次数 +1
    await db.collection('decks')
      .doc(deckId)
      .update({
        data: {
          uses: _.inc(1)
        }
      })

    // 返回卡组数据（小程序端自行保存到本地）
    return {
      success: true,
      data: {
        name: deckRes.data.name,
        description: deckRes.data.description,
        icon: deckRes.data.icon,
        iconBg: deckRes.data.iconBg || '#F1F5F9',
        cards: deckRes.data.cards,
        createdAt: new Date().toISOString()
      }
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
