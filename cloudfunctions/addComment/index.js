const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

// 内容安全检测（简化版）
const sensitiveWords = ['敏感词1', '敏感词2']

function checkContent(text) {
  for (const word of sensitiveWords) {
    if (text.includes(word)) {
      return false
    }
  }
  return true
}

// 添加评论
exports.main = async (event, context) => {
  const { deckId, content } = event

  // 参数校验
  if (!deckId) {
    return { success: false, error: '缺少卡组ID' }
  }
  if (!content || content.trim().length === 0) {
    return { success: false, error: '请输入评论内容' }
  }
  if (content.length > 200) {
    return { success: false, error: '评论不能超过200字' }
  }

  // 内容安全检测
  if (!checkContent(content)) {
    return { success: false, error: '评论包含敏感信息' }
  }

  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  if (!openid) {
    return { success: false, error: '请先登录' }
  }

  try {
    // 检查卡组是否存在
    const deckRes = await db.collection('decks')
      .doc(deckId)
      .get()

    if (!deckRes.data) {
      return { success: false, error: '卡组不存在' }
    }

    // 获取用户信息
    const userInfo = event.userInfo || {
      nickname: '匿名用户',
      avatar: ''
    }

    // 添加评论
    const res = await db.collection('comments').add({
      data: {
        deckId: deckId,
        _openid: openid,
        nickname: userInfo.nickname || '匿名用户',
        avatar: userInfo.avatar || '',
        content: content.trim(),
        createdAt: db.serverDate()
      }
    })

    return {
      success: true,
      data: {
        commentId: res._id
      }
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
