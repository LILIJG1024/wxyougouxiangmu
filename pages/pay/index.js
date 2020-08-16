// pages/cart/index.js
import { requestPayment, getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWX"
import regeneratorRuntime, { isGeneratorFunction } from "../../lib/runtime/runtime"
import { request } from "../../request/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        checkedCart: [],
        totalprice: 0,
        totalnum: 0
    },
    async handleOrderPay() {
        try {
            //判断缓存中有没有token
            const token = wx.getStorageSync("token");
            if (!token) {
                wx.navigateTo({
                    url: '/pages/order/index',
                });
            }
            const header = { Authorization: token }
            const order_price = this.data.totalprice
            const consignee_addr = this.data.address
            const cart = this.data.checkedCart
            let goods = []
            cart.forEach(v => goods.push({
                goods_id: v.goods_id,
                goods_number: v.num,
                goods_price: v.goods_price,
            }))
            const orderParams = { order_price, consignee_addr, goods }
            const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams, header })
            const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number }, header })
            await requestPayment(pay);
            const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number }, header })
            await showToast("支付成功")
            let newCart = wx.getStorageSync("cart");
            newCart = newCart.filter(v => !v.checked);
            wx.setStorageSync("cart", newCart);
            wx.navigateTo({
                url: '/pages/order/index',
            });

        } catch (error) {
            await showToast("支付失败")
        }

    },
    onShow() {
        const address = wx.getStorageSync("address") || [];
        let cart = wx.getStorageSync("cart");
        //过滤后的购物车数组
        let checkedCart = cart.filter(v => v.checked);
        let totalprice = 0
        let totalnum = 0
        checkedCart.forEach(element => {
            totalprice += element.num * element.goods_price
            totalnum += element.num
        });
        this.setData({
            address,
            checkedCart,
            totalprice,
            totalnum,
        })
    },
})