// pages/mycomment/mycomment.js
const api = require('../../services/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        offset: 0,
        limit: 5,
        tip: "没有更多数据",
        tipState: false,
        isWanted: true,
        current: 'Movie',
        verticalCurrent: 0,
        movies: [],
        books: [],
        songs: []

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
        console.log(options)
        let that = this;


        let user = getApp().globalData.userInfo;

        let route = "/users/" + user.id +"/comments?offset=0&limit="+this.data.limit;

        api.request("GET",route, true).then((res) => {
            
            that.setData({
                movies: res.data.movies,
                songs: res.data.songs,
                books:res.data.books,
                offset: this.data.limit
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.setData({
            tipState: true,
            tip: "正在加载"
        })
        let user = getApp().globalData.userInfo;

        let route = "/users/" + user.id + "/comments?offset="+this.data.offset+"&limit=" + this.data.limit;;
        
        console.log(route)
        api.request("GET", route).then((res) => {
            let temp = {};
            temp.movies = this.data.movies.concat(res.data.movies);
            temp.songs = this.data.songs.concat(res.data.songs);
            temp.books = this.data.books.concat(res.data.books);
            temp.offset = this.data.offset + this.data.limit;
            temp.tipState = false;
            temp.tip = "没有更多数据"
            this.setData(temp);
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})