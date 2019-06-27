// pages/rank/rank.js
const api = require('../../services/api');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible:false,
        searchVal: "",
        inputShowed: false,
        moviesRank: [],
        moviesHot: [],
        books: [],
        songs: []
    },
    //点击软键盘完成按钮的回调函数
    confirm: function(e) {
        //e.detail.value 
        wx.navigateTo({
            url: '/pages/search/search?wd=' + e.detail.value
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
        wx.getStorage({
            key: 'DBJ_User',
            success(res) {
                let user = JSON.parse(res.data);
                getApp().globalData.userInfo = user;
            }
        })
        api.request("GET", "/rank", true).then((res) => {
            console.log(res.data);
            this.setData({
                moviesRank: res.data.new_movies,
                moviesHot: res.data.hot_movies,
                books: res.data.hot_books,
                songs: res.data.hot_music,
                visible:true
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
        api.request("GET", "/rank", true).then((res) => {
            console.log(res.data);
            wx.stopPullDownRefresh(); //刷新完成后停止下拉刷新动效
            this.setData({
                moviesRank: res.data.new_movies,
                moviesHot: res.data.hot_movies,
                books: res.data.hot_books,
                songs: res.data.hot_music
            });


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