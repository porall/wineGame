Page({
  data: {
    userInfo: {
      nickName: '未登录',
      avatarUrl: '',
      gender: 0,
      country: '',
      province: '',
      city: ''
    },
    gameCount: 0,
    winCount: 0,
    favorCount: 0
  },

  onLoad() {
    // 获取用户信息
    this.getUserInfo();
    // 获取用户游戏数据
    this.getUserStats();
  },

  onShow() {
    // 页面显示时重新获取用户信息
    this.getUserInfo();
  },

  // 获取用户信息
  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    
    if (isLoggedIn && userInfo) {
      this.setData({ userInfo });
    } else {
      // 未登录状态
      this.setData({
        userInfo: {
          nickName: '未登录',
          avatarUrl: '',
          gender: 0,
          country: '',
          province: '',
          city: ''
        }
      });
    }
  },

  // 更新用户信息
  updateUserInfo() {
    wx.getUserProfile({
      desc: '用于更新用户资料',
      success: (res) => {
        console.log('更新用户信息成功:', res.userInfo);
        
        try {
          // 保存用户信息到本地存储
          wx.setStorageSync('userInfo', res.userInfo);
          wx.setStorageSync('isLoggedIn', true);
          console.log('用户信息保存成功');
          
          // 更新页面数据
          this.setData({ userInfo: res.userInfo });
          
          // 显示更新成功提示
          wx.showToast({
            title: '用户信息更新成功',
            icon: 'success'
          });
        } catch (storageErr) {
          console.error('保存用户信息失败:', storageErr);
          wx.showToast({
            title: '更新失败，请重试',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('更新用户信息失败:', err);
        wx.showToast({
          title: '更新失败，请重试',
          icon: 'none'
        });
      }
    });
  },

  // 获取用户游戏数据
  getUserStats() {
    // 这里可以从本地存储或服务器获取用户游戏数据
    // 暂时使用模拟数据
    const gameCount = wx.getStorageSync('gameCount') || 0;
    const winCount = wx.getStorageSync('winCount') || 0;
    const favorCount = wx.getStorageSync('favorCount') || 0;
    
    this.setData({
      gameCount,
      winCount,
      favorCount
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储的用户信息
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('isLoggedIn');
          
          // 重置用户信息
          this.setData({
            userInfo: {
              nickName: '未登录',
              avatarUrl: '',
              gender: 0,
              country: '',
              province: '',
              city: ''
            }
          });
          
          // 跳转到登录页面
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  },

  // 导航到设置页面
  navigateToSetting() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 导航到游戏历史页面
  navigateToHistory() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 导航到我的收藏页面
  navigateToFavorites() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 导航到关于我们页面
  navigateToAbout() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  }
});