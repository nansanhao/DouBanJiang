// pages/recommend/recommend.js
const api = require('../../services/api');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiper: {
            imgUrl: [],
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000
        },
        swiperImg: [
            "http://p1.music.126.net/pEUIMlwnEv16W_xsfyP7AA==/109951164173578882.jpg",
            "http://p1.music.126.net/KDhMB6fy6l6eioCGVq3t5Q==/109951164173655006.jpg",
            "http://p1.music.126.net/Ll4BaVEfUhyV44IoaIsA1Q==/109951164173628298.jpg",
            "http://p1.music.126.net/iE8RF_J8RJ8KHuv5TSDkzA==/109951164173713532.jpg",
            "http://p1.music.126.net/MGHO6vVC5foaGOL_RM7zTA==/109951164173594030.jpg",
            "http://p1.music.126.net/JAEDLSPX-5QJZDFl_5WFtQ==/109951164174505867.jpg",
            "http://p1.music.126.net/g7ENsKppGsFuSwgICQQvSQ==/109951164173596612.jpg",
            "http://p1.music.126.net/7Oz0hQc6psBWpYYmINb-jQ==/109951164174997673.jpg",
            "http://p1.music.126.net/vkICrNKOIqXtsQ9inaDV7A==/109951164173631257.jpg",
            "http://p1.music.126.net/u6xoXCbHTP1hQ0QG-_Jb0A==/109951164153012905.jpg",
            "http://p1.music.126.net/s-LWGIYBH4g33ZtpEZtkcg==/109951164159648857.jpg",
            "http://p1.music.126.net/iYc5TzEYHyYMUzG5t3zLKw==/109951164159234725.jpg"
        ],
        movies: [],
        books: [],
        songs: []
    },
    swiperRandom: function() {
        let max = this.data.swiperImg.length;
        let img1 = getRandomInt(max);
        let img2 = getRandomInt(max);
        let img3 = getRandomInt(max);
        while (img1 == img2 || img1 == img3 || img2 == img3) {
            img2 = getRandomInt(max);
            img3 = getRandomInt(max);
        }
        let swiperImg = [];
        let swiper = this.data.swiper;
        swiperImg.push(this.data.swiperImg[img1], this.data.swiperImg[img2], this.data.swiperImg[img3]);
        swiper.imgUrl = swiperImg;
        this.setData({
            swiper
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.swiperRandom();
        let user = getApp().globalData.userInfo;
        let route = "/users/" + user.id + "/recommends";
        // let route = "/users/" + "1" + "/recommends";
        
        api.request("GET", route, true).then((res) => {
            console.log(res.data);
            this.setData({
                movies: res.data.movies,
                books: res.data.books,
                songs: res.data.music
            })

        })
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
        this.swiperRandom();
        let user = getApp().globalData.userInfo;
        let route = "/users/" + user.id + "/recommends";
        // let route = "/users/" + "1" + "/recommends";

        api.request("GET", route, true).then((res) => {
            console.log(res.data);
            
            this.setData({
                movies: res.data.movies,
                books: res.data.books,
                songs: res.data.music
            });
            wx.stopPullDownRefresh(); //刷新完成后停止下拉刷新动效

        })
        
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}