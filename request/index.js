//同时发送异步代码的次数
let ajaxtime = 0
export const request = (params) => {
    ajaxtime++
    //显示加载中效果
    wx.showLoading({
        title: "Loading-.-",
        mask: true
    });
    //定义公共url
    const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseurl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxtime--
                if (ajaxtime === 0) {
                    wx.hideLoading();
                }
            },
        });

    })
}