// utils/auth.js - 微信登录授权模块

const APP_ID = 'wx8d121f2590124b8e'; // 小程序 AppID
const CLOUD_ENV = 'winegame-xxx';  // 云开发环境 ID

/**
 * 微信登录流程：
 * 1. wx.login 获取 code
 * 2. 发送 code 到云函数换取 openid
 * 3. 检查/创建用户记录
 */

/**
 * 登录（静默方式，不需要用户授权）
 * @returns {Promise<{openid, userId}>}
 */
function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          // 调用云函数登录
          callLoginFunction(res.code)
            .then(data => resolve(data))
            .catch(err => reject(err));
        } else {
          reject(new Error('login failed: no code'));
        }
      },
      fail: err => reject(err)
    });
  });
}

/**
 * 调用云函数进行登录
 */
function callLoginFunction(code) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'login',
      data: { code: code },
      success: res => {
        if (res.result && res.result.openid) {
          resolve({
            openid: res.result.openid,
            userId: res.result.userId // 数据库用户ID
          });
        } else {
          reject(new Error('login function error'));
        }
      },
      fail: err => reject(err)
    });
  });
}

/**
 * 获取用户信息（需要授权）
 * @returns {Promise<userInfo>}
 */
function getUserProfile() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: res => {
        resolve(res.userInfo);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

/**
 * 检查是否已登录
 * @returns {Promise<boolean>}
 */
async function checkLogin() {
  try {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo && userInfo.openid) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

/**
 * 获取本地存储的用户信息
 * @returns {object|null}
 */
function getLocalUserInfo() {
  try {
    return wx.getStorageSync('userInfo') || null;
  } catch (e) {
    return null;
  }
}

/**
 * 保存用户信息到本地
 * @param {object} userInfo
 */
function saveUserInfo(userInfo) {
  try {
    wx.setStorageSync('userInfo', userInfo);
  } catch (e) {
    console.error('save userInfo failed:', e);
  }
}

/**
 * 清除登录状态
 */
function logout() {
  try {
    wx.removeStorageSync('userInfo');
  } catch (e) {
    // ignore
  }
}

module.exports = {
  login,
  getUserProfile,
  checkLogin,
  getLocalUserInfo,
  saveUserInfo,
  logout
};