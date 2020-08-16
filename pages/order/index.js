// pages/order/index.js
import { login } from "../../utils/asyncWX"
import { request } from "../../request/index"
import regeneratorRuntime, { isGeneratorFunction } from "../../lib/runtime/runtime"
Page({
    async handlegetuserinfo(e) {
        const { signature, iv, encryptedData, rawData } = e.detail
        const { code } = await login();
        const loginParams = { signature, iv, encryptedData, rawData, code }
            //发送请求获取token
        const { token } = await request({ url: "/users/wxlogin", data: (loginParams), method: "post" })
        wx.setStorageSync("token", token);
        wx.navigateBack({
            delta: 1
        });
    },
})