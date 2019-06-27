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
            "http://p1.music.126.net/iYc5TzEYHyYMUzG5t3zLKw==/109951164159234725.jpg",
            "http://p1.music.126.net/_iBCUtelzjNqZjXSGERNMg==/109951164176041905.jpg",
            "http://p1.music.126.net/wixo8kjUEoekkCI746_QnA==/109951164176042943.jpg",
            "http://p1.music.126.net/phGLw7jdKIPO5A_jlx9o9w==/109951164176047831.jpg",
            "http://p1.music.126.net/3Wv1zLgj8SYaEUyKtGMyEg==/109951164176066020.jpg",
            "http://p3.music.126.net/nILBk4DaE3yV__25uq-5GQ==/18641120139241412.jpg?param=640y295",
            "http://p3.music.126.net/5_0ux0Y9P5WTfW70zSP2wQ==/3243559305677511.jpg?param=640y295",
            "http://p3.music.126.net/zYvSXBqlmL55t3CVo4VlDA==/109951163398561345.jpg?param=640y295",
            "http://p3.music.126.net/ZAP_c5J1QJEvFrR9Lq-adw==/109951163186202231.jpg?param=640y295",
            "http://p4.music.126.net/ql3nSwy0XKow_HAoZzRZgw==/109951163111196186.jpg?param=640y295",
            "http://p4.music.126.net/j6KWzSdlRKzZUwJnQx3vBA==/3300733912483912.jpg?param=640y295",
            "http://p3.music.126.net/YDKUscOIKTm7Ko7KyKWggw==/3346913395417148.jpg?param=640y295",
            "http://p3.music.126.net/o2qzE0Is5Qh1pfSKQiVGkA==/18646617697368402.jpg?param=640y295",
            "http://p4.music.126.net/tDq0mY0vZowfQ0lqm_Ky_A==/109951163062867010.jpg?param=640y295",
            "http://p3.music.126.net/Ear-Ycru9SHVKzEL39of9w==/3286440257877602.jpg?param=640y295",
            "http://p4.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg?param=640y295",
            "http://p3.music.126.net/YUFS4m_lTmQYM6UiIVLOYQ==/109951163720136153.jpg?param=640y295",
            "http://p4.music.126.net/Bjpvp-N4Pgx_1-fIVwzkSg==/18664209882483637.jpg?param=640y295",
            "http://p4.music.126.net/0KO3WQChy9QbkgzSY1gfHg==/109951164021266167.jpg?param=640y295",
            "http://p4.music.126.net/nSp0W3dWuUfEY5XETjhsVg==/109951164025974359.jpg?param=640y295",
            "http://p3.music.126.net/P2W12VnnitMxWpcTNrAvoA==/18493785580241377.jpg?param=640y295",
            "http://p4.music.126.net/Wj6YO6c3JIRVTm7Qmc7Iyg==/1383185640161007.jpg?param=640y295"


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