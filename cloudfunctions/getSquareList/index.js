const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 获取卡组列表
exports.main = async (event, context) => {
  const { page = 1, limit = 10, tag, keyword } = event

  // 构造查询条件
  let where = {
    isPublic: true,
    isDeleted: false
  }

  // 标签筛选
  if (tag) {
    where.tags = _.in([tag])
  }

  // 搜索关键词（搜索名称和描述）
  if (keyword) {
    where.$or = [
      { name: db.RegExp({ regexp: keyword, options: 'i' }) },
      { description: db.RegExp({ regexp: keyword, options: 'i' }) }
    ]
  }

  try {
    // 分页查询
    const skip = (page - 1) * limit
    
    const [listRes, countRes] = await Promise.all([
      db.collection('decks')
        .where(where)
        .orderBy('createdAt', 'desc')
        .skip(skip)
        .limit(limit)
        .field({
          name: true,
          description: true,
          icon: true,
          tags: true,
          likes: true,
          uses: true,
          views: true,
          'author.nickname': true,
          'author.avatar': true,
          createdAt: true
        })
        .get(),
      
      db.collection('decks')
        .where(where)
        .count()
    ])

    return {
      success: true,
      data: {
        list: listRes.data,
        total: countRes.total,
        page: page,
        limit: limit,
        hasMore: skip + listRes.data.length < countRes.total
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}
