# 卡组广场 - 云函数后端

## 云函数列表

| 云函数 | 功能 |
|-------|------|
| getSquareList | 获取卡组列表（分页+搜索+标签） |
| getDeckDetail | 获取卡组详情（浏览量+1） |
| publishDeck | 发布卡组（需登录） |
| likeDeck | 收藏/取消收藏 |
| useDeck | 使用卡组（导入到本地） |
| addComment | 添加评论 |

## 使用方法

1. 在微信开发者工具中，右键 `cloudfunctions` 目录
2. 选择"上传并部署：云端安装依赖"
3. 在小程序中调用：

```javascript
// 初始化云开发
wx.cloud.init({
  env: 'your-env-id'
})

// 调用云函数
wx.cloud.callFunction({
  name: 'getSquareList',
  data: { page: 1, limit: 10 }
})
```
