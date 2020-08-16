// pages/search/index.js
import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocused: false
    },
    Timeid: -1,
    inputValue: "",
    handleinput(e) {
        const { value } = e.detail
        if (!value.trim()) {
            this.setData({
                goods: [],
                isFocused: false
            })
            return
        }
        this.setData({
            isFocused: true
        })
        clearTimeout(this.Timeid)
        this.Timeid = setTimeout(() => {
            this.qsearch(value)
        }, 1000)
    },
    async qsearch(query) {
        const res = await request({ url: "/goods/qsearch", data: { query } })
        this.setData({
            goods: res
        })
    },
    handlecancal() {
        this.setData({
            inputValue: "",
            isFocused: false,
            goods: []
        })
    }
})