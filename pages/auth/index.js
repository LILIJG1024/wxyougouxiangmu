// pages/auth/index.js
import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        tabs: [{
                id: 0,
                value: "全部",
                isActive: true
            },
            {
                id: 1,
                value: "待付款",
                isActive: false
            }, {
                id: 2,
                value: "待发货",
                isActive: false
            }, {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ],
    },
    onShow(options) {
        const token = wx.getStorageSync("token");
        // if (!token) {
        //     wx.navigateTo({
        //         url: '/pages/order/index',
        //     });
        //     return
        // }
        //1.获取当前小程序的页面栈
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1]
        const { type } = currentPage.options
        this.getOrders(type)
    },
    async getOrders(type) {
        const header = { Authorization: token }
        const res = await request({ url: "/my/orders/all", data: { type }, header })
        this.setData({
            orders: res.orders
        })
    },
    handleTabsChange(e) {
        const { index } = e.detail
        let { tabs } = this.data;
        tabs.forEach((element, i) => {
            i === index ? element.isActive = true : element.isActive = false
        });
        this.setData({
            tabs
        })
    },
})