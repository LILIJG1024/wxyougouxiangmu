//Page Object
import { request } from "../../request/index.js"
Page({
    data: {
        //轮播图数组
        swiperList: [],
        CateList: [],
        floorList: []
    },
    //页面开始加载的时候就会触发
    onLoad: function(options) {
        //优化 使用promise解决回调地狱
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     header: { 'content-type': 'application/json' },
        //     success: (result) => {
        //         console.log(result)
        //         this.setData({
        //             swiperList: result.data.message
        //         })
        //     },
        // });
        this.getSwiperList();
        this.getCateList();
        this.getFloorList();
    },
    getSwiperList() {
        request({ url: "/home/swiperdata" }).then(result => {
            this.setData({
                swiperList: result
            })
        })
    },
    getCateList() {
        request({ url: "/home/catitems" }).then(result => {
            this.setData({
                CateList: result
            })
        })
    },
    getFloorList() {
        request({ url: "/home/floordata" }).then(result => {
            this.setData({
                floorList: result
            })
        })
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});