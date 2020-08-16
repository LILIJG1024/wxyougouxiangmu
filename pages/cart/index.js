// pages/cart/index.js
import { showToast, getSetting, chooseAddress, openSetting, showModal } from "../../utils/asyncWX"
import regeneratorRuntime, { isGeneratorFunction } from "../../lib/runtime/runtime"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalprice: 0,
        totalnum: 0
    },
    async handlePut() {
        try {
            const res1 = await getSetting()
            const scopeAddress = res1.authSetting["scope.address"]
            if (scopeAddress === false) {
                await openSetting()
            }
            const address = await chooseAddress()
            wx.setStorageSync("address", address);
        } catch (error) {

        }
    },
    handleItemChange(e) {
        const goods_id = e.currentTarget.dataset.id
        let { cart } = this.data
        let index = cart.findIndex(v => v.goods_id === goods_id)
        cart[index].checked = !cart[index].checked
        this.setCart(cart)
    },
    handleItemAllChange() {
        let { cart, allChecked } = this.data;
        allChecked = !allChecked;
        cart.forEach(v => v.checked = allChecked);
        this.setCart(cart)
    },
    async handleNum(e) {
        const { operation, id } = e.currentTarget.dataset
        let { cart } = this.data
        let index = cart.findIndex(v => v.goods_id === id)
        cart[index].num += operation
        if (cart[index].num < 1) {
            cart[index].num = 1
            const res = await showModal("Do you want to remove it?")
            if (res.confirm) {
                cart.splice(index, 1)
                this.setCart(cart)
            }
        }
        this.setCart(cart)
    },
    async handlePay() {
        const { address, totalnum } = this.data;
        if (!address.userName) {
            await showToast("配送到外星球嘛客官=.=")
            return
        }
        if (totalnum === 0) {
            await showToast("购物车里面没有商品哦-.-")
            return
        }
        wx.navigateTo({
            url: '/pages/pay/index',
        });
    },
    onShow() {
        const cart = wx.getStorageSync("cart");
        const address = wx.getStorageSync("address") || [];
        this.setCart(cart)
        this.setData({
            address
        })
    },
    setCart(cart) {
        wx.setStorageSync("cart", cart);
        //every数组方法会遍历会接收一个回调函数，那么每一个回调函数都返回true，那么every方法就会返回true
        const allChecked = cart.length ? cart.every(v => v.checked) : false
        let totalprice = 0
        let totalnum = 0
        cart.forEach(element => {
            if (element.checked) {
                totalprice += element.num * element.goods_price
                totalnum += element.num
            }
        });
        this.setData({
            cart,
            totalprice,
            totalnum,
            allChecked
        })
    }
})