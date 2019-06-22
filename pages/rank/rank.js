// pages/rank/rank.js
const api = require('../../services/api');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiper: {
            imgUrl: [
                "http://p1.music.126.net/u6xoXCbHTP1hQ0QG-_Jb0A==/109951164153012905.jpg",
                "http://p1.music.126.net/fRa3OI3v1rKCUsElt_7njg==/109951164153046622.jpg",
                "http://p1.music.126.net/889P6e8H5-57pmbPAALfBQ==/109951164152978157.jpg"
            ],
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000
        },
        searchVal: "",
        inputShowed: false,
        
        moviesRank: [{
                name: "黑衣人：全球追缉",
                imgUrl: "https://img1.doubanio.com/view/photo/l/public/p2558701068.jpg",
                rate: 4
            },
            {
                name: "最好的我们",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2557157554.jpg",
                rate: 4
            },
            {
                name: "哥斯拉2",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554370800.jpg",
                rate: 4
            },
            {
                name: "调音师",
                imgUrl: "https://img1.doubanio.com/view/photo/m/public/p2551995207.jpg",
                rate: 4
            },
            {
                name: "黑衣人：全球追缉",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554370800.jpg",
                rate: 4
            },
            {
                name: "黑衣人：全球追缉",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554370800.jpg",
                rate: 4
            }
        ],
        moviesHot: [{
                name: "雪暴",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554545271.jpg",
                rate: 4
            },
            {
                name: "我们",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551094671.jpg",
                rate: 4
            },
            {
                name: "毒液：致命守护者",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2537158013.jpg",
                rate: 4
            },
            {
                name: "老师·好",
                imgUrl: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2551352209.jpg",
                rate: 4
            },
            {
                name: "邪不压正",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2526297221.jpg",
                rate: 4
            },
            {
                name: "西虹市首富",
                imgUrl: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529206747.jpg",
                rate: 4
            }
        ],
        books: [{
                name: "一只计划逃跑的蛋",
                imgUrl: "https://img3.doubanio.com/view/subject/m/public/s33297595.jpg",
                rate: 4
            },
            {
                name: "犹大之窗",
                imgUrl: "https://img3.doubanio.com/view/subject/l/public/s32313716.jpg",
                rate: 4
            },
            {
                name: "天使之耳",
                imgUrl: "https://img3.doubanio.com/view/subject/l/public/s32326952.jpg",
                rate: 4
            },
            {
                name: "药物简史",
                imgUrl: "https://img3.doubanio.com/view/subject/l/public/s32296303.jpg",
                rate: 4
            },
            {
                name: "韩剧如何讲故事",
                imgUrl: "https://img3.doubanio.com/view/subject/l/public/s32327915.jpg",
                rate: 4
            }
        ],
        songs: [{
                name: "Bo doubt",
                imgUrl: "http://p2.music.126.net/ucKEvxKIveuKXZLlCq5kOQ==/109951164156198022.jpg?param=130y130",
                rate: ""
            },
            {
                name: "BlackACE",
                imgUrl: "http://p1.music.126.net/8N3IrtEEupueYo1rkY-NNw==/109951164105788682.jpg?param=177y177",
                rate: ""
            },
            {
                name: "Like A Fan",
                imgUrl: "http://p1.music.126.net/YGTCUr9GACzSkKpto1nFJA==/109951164144564839.jpg?param=177y177",
                rate: ""
            },
            {
                name: "灰烬",
                imgUrl: "http://p1.music.126.net/SQk4cayv5n4HWKOQDh5Ygg==/109951164155902259.jpg?param=177y177",
                rate: ""
            },
            {
                name: "你엉클준",
                imgUrl: "http://p1.music.126.net/evGI0Rt47CQb2Zlk0URyUg==/109951164154121719.jpg?param=177y177",
                rate: ""
            },
            {
                name: "你曾是少年",
                imgUrl: "http://p2.music.126.net/qXoj3GTwWWtDDETq72oovQ==/109951164107576105.jpg?param=130y130",
                rate: ""
            }
        ]
    },
    //点击软键盘完成按钮的回调函数
    confirm:function(e){
        //e.detail.value 
        wx.navigateTo({
            url: '/pages/search/search?wd='+e.detail.value
        })
    },
    showInput: function() {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function() {
        this.setData({
            searchVal: "",
            inputShowed: false
        });
    },
    clearInput: function() {
        this.setData({
            searchVal: ""
        });
    },
    inputTyping: function(e) {
        this.setData({
            searchVal: e.detail.value
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        api.request
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