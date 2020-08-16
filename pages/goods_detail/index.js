// pages/goods_detail/index.js
import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsobj: {},
        isCollect: false
    },
    //全局商品数据
    GoodsInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1]
        let options = currentPage.options
        const goods_id = options.goods_id
        this.getGoodsDetail(goods_id)


    },
    async getGoodsDetail(goods_id) {
        const goodsobj = await request({ url: "/goods/detail", data: { goods_id } })
        this.GoodsInfo = goodsobj
        let collect = wx.getStorageSync("collect") || [];
        let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
        this.setData({
            goodsobj: {
                goods_name: goodsobj.goods_name,
                goods_price: goodsobj.goods_price,
                //iphone部分手机不识别webp图片格式
                //临时修改 确保后台存在jpg格式
                goods_introduce: goodsobj.goods_introduce.replace(/\.wbep/g, 'jpg'),
                pics: goodsobj.pics
            },
            isCollect
        })
    },
    handlePreviewImage(e) {
        //1.先构造要预览的图片数组
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
        //2.接收url
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls
        });

    },
    handleCartAdd() {
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        if (index === -1) {
            this.GoodsInfo.num = 1
            this.GoodsInfo.checked = true
            cart.push(this.GoodsInfo)
        } else {
            cart[index].num++;
        }
        wx.setStorageSync("cart", cart);
        wx.showToast({
            title: '加入成功-.-',
            icon: 'success',
            mask: true,
        });

    },
    handleAddshoucang() {
        let isCollect = false
        let collect = wx.getStorageSync("collect") || [];
        let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        console.log(index);
        if (index !== -1) {
            collect.splice(index, 1)
            isCollect = false
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true,
            });
        } else {
            collect.push(this.GoodsInfo)
            isCollect = true
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true,
            });
        }
        wx.setStorageSync("collect", collect);
        this.setData({
            isCollect
        })
    }
})