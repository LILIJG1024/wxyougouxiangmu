// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "体验问题",
                isActive: true
            },
            {
                id: 1,
                value: "商品投诉",
                isActive: false
            }
        ],
        chooseImgs: [],
        textVal: ""
    },
    //外网图片路径数组
    upLoadImgs: [],
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
    handleChooseImg() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                this.setData({
                    chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
                })

            }
        });
    },
    handleMoveImg(e) {
        const { index } = e.currentTarget.dataset
        const { chooseImgs } = this.data
        chooseImgs.splice(index, 1)
        this.setData({
            chooseImgs
        })
    },
    handleTextInput(e) {
        this.setData({
            textVal: e.detail.value
        })
    },
    handleSubmit() {
        const { textVal, chooseImgs } = this.data
        if (!textVal.trim()) {
            wx.showToast({
                title: '输入不合法',
                mask: true,
            });
            return
        }
        chooseImgs.forEach((v, i) => {
            wx.uploadFile({
                url: 'https://images.ac.cn/Home/Index/UploadAction/',
                filePath: v,
                name: "file",
                formData: {},
                success: (result) => {
                    let url = JSON.parse(result.data).url
                    this.upLoadImgs.push(url)
                    if (i === chooseImgs.length - 1) {
                        this.setData({
                            textVal: "",
                            chooseImgs: []
                        })
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                },
            });
        })
    }
})