// pages/profile/profile.js
const app = getApp();
const { login, getUserProfile, getLocalUserInfo, saveUserInfo, logout } = require('../../utils/auth.js');

Page({
  data: {
    // 用户信息
    userInfo: null,
    // 统计数据
    stats: {
      totalDraws: 0,
      downloads: 0,
      created: 0,
      favorites: 0
    },
    // 加载状态
    loading: true
  },

  onLoad() {
    this.checkLogin();
  },

  onShow() {
    this.loadUserData();
  },

  // 检查登录状态
  async checkLogin() {
    this.setData({ loading: true });
    
    try {
      const localUser = getLocalUserInfo();
      
      if (localUser && localUser.openid) {
        // 已登录
        this.setData({ userInfo: localUser });
        await this.loadUserData();
      } else {
        // 未登录，执行登录
        await this.doLogin();
      }
    } catch (err) {
      console.error('checkLogin error:', err);
      this.setData({ loading: false });
    }
  },

  // 执行登录
  async doLogin() {
    wx.showLoading({ title: '登录中...' });
    
    try {
      const { openid, userId } = await login();
      
      const userInfo = {
        openid: openid,
        userId: userId
      };
      
      saveUserInfo(userInfo);
      this.setData({ userInfo: userInfo });
      
      await this.loadUserData();
    } catch (err) {
      console.error('login error:', err);
      wx.showToast({ title: '登录失败', icon: 'none' });
    } finally {
      wx.hideLoading();
      this.setData({ loading: false });
    }
  },

  // 从数据库加载用户数据
  async loadUserData() {
    const userInfo = this.data.userInfo;
    if (!userInfo || !userInfo.userId) {
      this.setData({ loading: false });
      return;
    }
    
    try {
      const db = wx.cloud.database();
      const res = await db.collection('users').doc(userInfo.userId).get();
      
      if (res.data) {
        // 更新本地存储
        const updatedInfo = {
          ...userInfo,
          nickname: res.data.nickname,
          avatar: res.data.avatar,
          totalDraws: res.data.totalDraws || 0,
          downloadedDecks: res.data.downloadedDecks || [],
          favoriteDecks: res.data.favoriteDecks || [],
          createdDecks: res.data.createdDecks || []
        };
        
        saveUserInfo(updatedInfo);
        
        this.setData({
          userInfo: updatedInfo,
          stats: {
            totalDraws: res.data.totalDraws || 0,
            downloads: (res.data.downloadedDecks || []).length,
            created: (res.data.createdDecks || []).length,
            favorites: (res.data.favoriteDecks || []).length
          }
        });
      }
    } catch (err) {
      console.error('loadUserData error:', err);
    } finally {
      this.setData({ loading: false });
    }
  },

  // 微信授权获取用户信息
  async onGetUserProfile() {
    // 检查是否已授权
    if (this.data.userInfo && this.data.userInfo.nickname) {
      return; // 已授权
    }
    
    try {
      const userInfo = await getUserProfile();
      
      // 更新到数据库
      await wx.cloud.database().collection('users').doc(this.data.userInfo.userId).update({
        data: {
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          updatedAt: new Date()
        }
      });
      
      // 更新本地
      const localInfo = {
        ...this.data.userInfo,
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl
      };
      saveUserInfo(localInfo);
      this.setData({ userInfo: localInfo });
      
      wx.showToast({ title: '授权成功', icon: 'success' });
    } catch (err) {
      console.error('getUserProfile error:', err);
      wx.showToast({ title: '授权失败', icon: 'none' });
    }
  },

  // 跳转我的卡组
  goToMyDecks() {
    wx.navigateTo({ url: '/pages/main/main' });
  },

  // 跳转收藏夹
  goToFavorites() {
    wx.navigateTo({ 
      url: '/pages/main/main?type=favorite' 
    });
  },

  // 跳转我的创作
  goToCreated() {
    wx.navigateTo({ 
      url: '/pages/main/main?type=created' 
    });
  },

  // 跳转设置
  goToSettings() {
    wx.navigateTo({ url: '/pages/settings/settings' });
  },

  // 跳转关于
  goToAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '酒桌游戏 - 聚会破冰神器',
      path: '/pages/index/index'
    };
  }
});