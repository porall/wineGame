/**
 * 内容安全检测模块
 * 提供敏感词检测功能
 */

/**
 * 敏感词列表
 * 注意：实际生产环境建议接入微信官方内容安全 API (msgSecCheck)
 */
const sensitiveWords = ['敏感词1', '敏感词2', '测试']

/**
 * 检测文本内容是否包含敏感词
 * @param {string} text - 待检测的文本内容
 * @returns {boolean} true 表示内容安全，false 表示包含敏感词
 */
function checkContent(text) {
  if (!text || typeof text !== 'string') {
    return true
  }
  
  for (const word of sensitiveWords) {
    if (text.includes(word)) {
      return false
    }
  }
  return true
}

/**
 * 检测多个文本字段是否包含敏感词
 * @param {string[]} texts - 待检测的文本数组
 * @returns {boolean} true 表示全部安全，false 表示任一包含敏感词
 */
function checkMultipleContents(texts) {
  return texts.every(text => checkContent(text))
}

module.exports = {
  checkContent,
  checkMultipleContents,
  sensitiveWords
}