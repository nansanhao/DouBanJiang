// pages/search/search.js
const api = require('../../services/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        offset:0,
        limit:9,
        tip:"上拉刷新",
        searchVal: "",
        inputShowed: true,
        searchFocused: false,
        current: 'Movie',
        movies: [{
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
    handleChange({
        detail
    }) {
        let that=this;
        let route = "/search?wd=" + that.data.searchVal + "&type=" + detail.key + "&offset=0&limit=9"
        api.request("GET", route).then((res) => {
            let temp={};
            temp.current = detail.key;
            let type = detail.key.toLowerCase()+"s";
            temp[type]=res.data;
            temp.offset = 0 + that.data.limit;
            temp.tip = "上拉刷新"
            that.setData(temp);
        });
        
    },
    showInput: function() {
        this.setData({
            inputShowed: true,
            searchFocused: true
        });
    },
    hideInput: function() {
        this.setData({
            searchVal: "",
            inputShowed: false,
            searchFocused: false
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
    confirm: function(e) {
        //向后台发请求
        let that=this;
        let route = "/search?wd=" + this.data.searchVal + "&type=" + this.data.current + "&offset=0&limit=9";
        api.request("GET", route).then((res) => {
            let temp={};
            let type = that.data.current.toLowerCase()+"s";
            temp[type]=res.data;
            temp.offset = 0 + that.data.limit;
            temp.tip = "上拉刷新"
            that.setData(temp);
        });
        

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that=this;
        api.request("GET", "/search?wd=" + options.wd + "&type=Movie&offset=0&limit=9").then((res) => {
            let offset = that.data.offset + that.data.limit;
            that.setData({
                searchVal: options.wd,
                movies: res.data,
                offset
            });
        });



        //向后台发请求
        console.log(options)
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
        let that = this;
        let route = "/search?wd=" + this.data.searchVal + "&type=" + this.data.current + "&offset="+that.data.offset+"&limit=9";
        api.request("GET", route).then((res) => {
            let temp = {};
            let type = that.data.current.toLowerCase() + "s";
            temp[type] = that.data[type].concat(res.data);
            temp.offset = that.data.offset + that.data.limit;
            temp.tip="没有更多数据"
            that.setData(temp);
            
        });
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})