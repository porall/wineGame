Page({
  data: {
    isLoading: false
  },

  // 获取用户信息
  getUserInfo() {
    if (this.data.isLoading) return;

    this.setData({ isLoading: true });

    console.log('开始获取用户信息...');

    // 直接调用获取用户信息API，确保在用户点击手势的上下文中
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('获取用户信息成功:', res.userInfo);
        
        try {
          // 保存用户信息到本地存储
          wx.setStorageSync('userInfo', res.userInfo);
          wx.setStorageSync('isLoggedIn', true);
          console.log('用户信息保存成功');
        } catch (storageErr) {
          console.error('保存用户信息失败:', storageErr);
        }
        
        // 直接跳转到首页，不依赖wx.login的结果
        console.log('准备跳转到首页...');
        wx.switchTab({
          url: '/pages/index/index',
          success: () => {
            console.log('跳转到首页成功');
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
            this.setData({ isLoading: false });
          },
          fail: (switchErr) => {
            console.error('跳转到首页失败:', switchErr);
            wx.showToast({
              title: '跳转失败，请重试',
              icon: 'none'
            });
            this.setData({ isLoading: false });
          }
        });
        
        // 调用微信登录API获取code（可选，用于后端验证）
        wx.login({
          success: (loginRes) => {
            if (loginRes.code) {
              console.log('登录成功，code:', loginRes.code);
              // 这里可以将code发送到后端服务器进行验证
            }
          },
          fail: (loginErr) => {
            console.error('获取登录凭证失败:', loginErr);
          }
        });
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err);
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        });
        this.setData({ isLoading: false });
      }
    });
  },

  onLoad() {
    // 检查是否已登录
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (isLoggedIn) {
      // 已登录则跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
});