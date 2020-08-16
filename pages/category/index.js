// pages/category/index.js
import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenu: [],
        rightContent: [],
        currentindex: 0,
        scrollTop: 0
    },
    //本地存储数据
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const Cates = wx.getStorageSync("cates");
        if (!Cates) {
            this.getCates();
        } else {
            //有数据
            if (Date.now() - Cates.time > 10000) {
                this.getCates();
            } else {
                this.Cates = Cates.data
                let leftMenu = this.Cates.map(v => v.cat_name)
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenu,
                    rightContent,
                    scrollTop: 0
                })
            }
        }
    },
    async getCates() {
        // request({
        //     url: "/categories"
        // }).then(res => {
        //     this.Cates = res.data.message
        //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });

        //     let leftMenu = this.Cates.map(v => v.cat_name)
        //     let rightContent = this.Cates[0].children
        //     this.setData({
        //         leftMenu,
        //         rightContent,
        //     })
        // })
        const res = await request({ url: "/categories" })
        this.Cates = res
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
        let leftMenu = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
            leftMenu,
            rightContent,
        })
    },
    handleItemTap(e) {
        const newindex = e.currentTarget.dataset.index
        let rightContent = this.Cates[newindex].children
        this.setData({
            currentindex: newindex,
            rightContent,
            scrollTop: 0
        })
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})