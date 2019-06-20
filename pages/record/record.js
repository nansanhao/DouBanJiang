// pages/record/record.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 'movie',
        verticalCurrent: 0,
        movies: [{
                name: "雪暴",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554545271.jpg",
                rate: 4.7,
                date:"2019",
                viewDate: "2019-10-03",
                tags: "喜剧 动作 科幻",
                origin: "美国",

            },
            {
                name: "我们",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551094671.jpg",
                rate: 4,
                date: "2019",
                viewDate: "2019-08-13",
                tags: "喜剧 动作 科幻",
                origin: "美国"
            },
            {
                name: "毒液：致命守护者护者护者",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2537158013.jpg",
                rate: 4,
                date: "2019",
                viewDate: "2019-07-28",
                tags: "喜剧 动作 科幻",
                origin: "美国"

            },
            {
                name: "老师·好",
                imgUrl: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2551352209.jpg",
                rate: 4,
                date: "2019",
                viewDate: "2019-05-14",
                tags: "喜剧 动作 科幻",
                origin: "美国"

            },
            {
                name: "邪不压正",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2526297221.jpg",
                rate: 4,
                date: "2019",
                viewDate: "2019-04-01",
                tags: "喜剧 动作 科幻",
                origin: "美国"

            },
            {
                name: "西虹市首富",
                imgUrl: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529206747.jpg",
                rate: 4,
                date: "2019",
                viewDate: "2019-01-11",
                tags: "喜剧 动作 科幻",
                origin: "美国"

            }
        ]

    },
    handleChange({
        detail
    }) {
        this.setData({
            current: detail.key
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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