// pages/record/record.js
const api = require('../../services/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 'Movie',
        verticalCurrent: 0,
        movies: [{
                name: "雪暴",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554545271.jpg",
                rate: 4.7,
                date: "2019",
                viewDate: "2019-10-03",
                tags: "喜剧 动作 科幻",
                origin: "美国",

            },
            {
                name: "我们",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551094671.jpg",
                rate: 4.0,
                date: "2019",
                viewDate: "2019-08-13",
                tags: "喜剧 动作 科幻",
                origin: "美国"
            },
            {
                name: "毒液：致命守护者护者护者",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2537158013.jpg",
                rate: 4.1,
                date: "2019",
                viewDate: "2019-07-28",
                tags: "喜剧 动作 科幻",
                origin: "美国"

            },
            {
                name: "老师·好",
                imgUrl: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2551352209.jpg",
                rate: 4.3,
                date: "2019",
                viewDate: "2019-05-14",
                tags: "喜剧 动作 科幻",
                origin: "美国"

            },
            {
                name: "邪不压正",
                imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2526297221.jpg",
                rate: 4.2,
                date: "2019",
                viewDate: "2019-04-01",
                tags: "喜剧 动作 科幻",
                origin: "美国"

            },
            {
                name: "西虹市首富",
                imgUrl: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529206747.jpg",
                rate: 4.5,
                date: "2019",
                viewDate: "2019-01-11",
                tags: "喜剧 动作 科幻",
                origin: "美国"

            }
        ],
        books: [{
                name: "一只计划逃跑的蛋",
                imgUrl: "https://img3.doubanio.com/view/subject/m/public/s33297595.jpg",
                rate: 3.2,
                date: "2019",
                viewDate: "2019-01-11",
                author: "康华 著 / 耿艾慈 绘",
                press: "广西师范大学出版社"
            },
            {
                name: "犹大之窗",
                imgUrl: "https://img3.doubanio.com/view/subject/l/public/s32313716.jpg",
                rate: 4.8,
                date: "2019",
                viewDate: "2019-01-11",
                author: "[美]约翰·迪克森·卡尔",
                press: "新星出版社"
            },
            {
                name: "天使之耳",
                imgUrl: "https://img3.doubanio.com/view/subject/l/public/s32326952.jpg",
                rate: 4.9,
                date: "2019",
                viewDate: "2019-01-11",
                author: "[日]东野圭吾",
                press: "人民文学出版社"
            },
            {
                name: "药物简史",
                imgUrl: "https://img3.doubanio.com/view/subject/l/public/s32296303.jpg",
                rate: 2.3,
                date: "2019",
                viewDate: "2019-01-11",
                author: "[英]德劳因·伯奇",
                press: "中信出版集团"
            },
            {
                name: "韩剧如何讲故事",
                imgUrl: "https://img3.doubanio.com/view/subject/l/public/s32327915.jpg",
                rate: 3.6,
                date: "2019",
                viewDate: "2019-01-11",
                author: "[韩]郑淑",
                press: "中信出版集团"
            }
        ],
        songs: [{
                name: "Bo doubtoubtoubtoubtoubt",
                imgUrl: "http://p2.music.126.net/ucKEvxKIveuKXZLlCq5kOQ==/109951164156198022.jpg?param=130y130",
                rate: 3.2,
                releaseDate: "2018-05-16",
                listenDate: "2019-01-11",
                singer: "Useong"
            },
            {
                name: "BlackACE",
                imgUrl: "http://p1.music.126.net/8N3IrtEEupueYo1rkY-NNw==/109951164105788682.jpg?param=177y177",
                rate: 3.2,
                releaseDate: "2018-05-16",
                listenDate: "2019-01-11",
                singer: "Useong"
            },
            {
                name: "Like A Fan",
                imgUrl: "http://p1.music.126.net/YGTCUr9GACzSkKpto1nFJA==/109951164144564839.jpg?param=177y177",
                rate: 4.6,
                releaseDate: "2018-05-16",
                listenDate: "2019-01-11",
                singer: "Useong"
            },
            {
                name: "灰烬",
                imgUrl: "http://p1.music.126.net/SQk4cayv5n4HWKOQDh5Ygg==/109951164155902259.jpg?param=177y177",
                rate: 2.6,
                releaseDate: "2018-05-16",
                listenDate: "2019-01-11",
                singer: "Useong"
            },
            {
                name: "你엉클준",
                imgUrl: "http://p1.music.126.net/evGI0Rt47CQb2Zlk0URyUg==/109951164154121719.jpg?param=177y177",
                rate: 1.2,
                releaseDate: "2018-05-16",
                listenDate: "2019-01-11",
                singer: "Useong"
            },
            {
                name: "你曾是少年",
                imgUrl: "http://p2.music.126.net/qXoj3GTwWWtDDETq72oovQ==/109951164107576105.jpg?param=130y130",
                rate: 3.6,
                releaseDate: "2018-05-16",
                listenDate: "2019-01-11",
                singer: "Useong"
            }
        ]

    },
    handleChange({
        detail
    }) {
        let user = getApp().globalData.userInfo;
        
        let route="";
        if(this.data.isWanted){
            route = "/" + detail.key.toLowerCase() + "s/want?session_id=" + user.id + "&offset=0&limit=10";
        }else{
            let types = {
                Movie: "/movies/seen",
                Song: "/songs/listened",
                Book: "/books/viewed"
            };
            route = types[detail.key] + "?session_id=" + user.id + "&offset=0&limit=10"
        }
        console.log(route)
        api.request("GET",route).then((res) => {
            let type = this.data.current.toLowerCase()+"s";
            let temp={};
            temp[type]=res.data.reverse();
            this.setData(temp)
        })
        this.setData({
            current: detail.key
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        let title = '';

        let user = getApp().globalData.userInfo;

        if (options.isWanted == 'true') {
            title = "想 - 看/听/读"
            api.request("GET", "/movies/want?session_id=" + user.id + "&offset=0&limit=10").then((res) => {
                this.setData({
                    movies: res.data.reverse()
                })
            })
        } else {
            title = "看/听/读 - 过"
            api.request("GET", "/movies/seen?session_id=" + user.id + "&offset=0&limit=10").then((res) => {
                this.setData({
                    movies: res.data.reverse()
                })
            })
        }
        wx.setNavigationBarTitle({
            title: title
        })
        this.setData(options);





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