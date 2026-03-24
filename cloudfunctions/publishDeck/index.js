const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

// 内容安全检测（简化版，实际建议调用微信 msgSecCheck）
const sensitiveWords = ['敏感词1', '敏感词2', '测试'] // 实际应该接入微信内容安全API

function checkContent(text) {
  for (const word of sensitiveWords) {
    if (text.includes(word)) {
      return false
    }
  }
  return true
}

// 发布卡组
exports.main = async (event, context) => {
  const { name, description, icon, tags, cards, isPublic = true } = event

  // 参数校验
  if (!name || name.trim().length === 0) {
    return { success: false, error: '请输入卡组名称' }
  }
  if (name.length > 20) {
    return { success: false, error: '名称不能超过20字' }
  }
  if (!cards || cards.length === 0) {
    return { success: false, error: '请添加至少一张卡牌' }
  }
  if (cards.length > 100) {
    return { success: false, error: '卡牌不能超过100张' }
  }

  // 内容安全检测
  if (!checkContent(name) || !checkContent(description || '')) {
    return { success: false, error: '内容包含敏感信息' }
  }

  // 检查频率（简化：实际可用 Redis 限流）
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  if (!openid) {
    return { success: false, error: '请先登录' }
  }

  try {
    // 获取用户信息（简化：实际应该从 users 集合获取）
    const userInfo = event.userInfo || {
      nickname: '匿名用户',
      avatar: ''
    }

    // 创建卡组
    const res = await db.collection('decks').add({
      data: {
        name: name.trim(),
        description: description ? description.trim() : '',
        icon: icon || '✨',
        tags: tags || [],
        cards: cards,
        author: {
          _openid: openid,
          nickname: userInfo.nickname || '匿名用户',
          avatar: userInfo.avatar || ''
        },
        likes: 0,
        uses: 0,
        views: 0,
        isPublic: isPublic,
        isDeleted: false,
        createdAt: db.serverDate(),
        updatedAt: db.serverDate()
      }
    })

    return {
      success: true,
      data: {
        deckId: res._id
      }
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
