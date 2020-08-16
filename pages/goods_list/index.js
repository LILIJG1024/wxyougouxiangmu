// pages/goods_list/index.js
import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            }, {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        goodslist: []
    },
    queryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10,
    },
    totalpage: 1,
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.queryParams.cid = options.cid || "";
        this.queryParams.query = options.query || "";
        this.getGoodsList()
    },
    async getGoodsList() {
        const res = await request({ url: "/goods/search", data: this.queryParams })
        const total = res.total
        this.totalpage = Math.ceil(total / this.queryParams.pagesize)
        this.total = total
        this.setData({
            goodslist: [...this.data.goodslist, ...res.goods]
        });
        //关闭下拉刷新窗口
        wx.stopPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.setData({
            goodslist: []
        })
        this.queryParams.pagenum = 1;
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.queryParams.pagenum >= this.totalpage) {
            wx.showToast({
                title: '没有更多啦-.-',
            });
        } else {
            this.queryParams.pagenum++;
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})