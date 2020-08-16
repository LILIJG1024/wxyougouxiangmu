// pages/login/index.js
Page({
    handleuserinfo(e) {
        const { userInfo } = e.detail
        wx.setStorageSync("userinfo", userInfo);
        wx.navigateBack({
            delta: 1
        });
    }
})