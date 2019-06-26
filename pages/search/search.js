// pages/search/search.js
const api = require('../../services/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        offset:0,
        limit:12,
        tip:"上拉刷新",
        tipState:false,
        searchVal: "",
        inputShowed: true,
        searchFocused: false,
        current: 'Movie',
        movies: [],
        books: [],
        songs: []

    },
    handleChange({
        detail
    }) {
        let that=this;
        let route = "/search?wd=" + that.data.searchVal + "&type=" + detail.key + "&offset=0&limit="+this.data.limit;
        api.request("GET", route,true).then((res) => {
            if (res.data.length < that.data.limit) {
                that.setData({
                    tip: "没有更多数据"
                })
            }
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
        let route = "/search?wd=" + this.data.searchVal + "&type=" + this.data.current + "&offset=0&limit="+that.data.limit;
        api.request("GET", route,true).then((res) => {
            if (res.data.length < that.data.limit) {
                that.setData({
                    tip: "没有更多数据"
                })
            }
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
        api.request("GET", "/search?wd=" + options.wd + "&type=Movie&offset=0&limit="+that.data.limit,true).then((res) => {
            let offset = that.data.offset + that.data.limit;
            if (res.data.length < that.data.limit) {
                that.setData({
                    tip: "没有更多数据"
                })
            }
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
        this.setData({
            tipState:true,
            tip:"正在加载"
        })
        let that = this;
        let route = "/search?wd=" + this.data.searchVal + "&type=" + this.data.current + "&offset="+that.data.offset+"&limit="+that.data.limit;
        api.request("GET", route).then((res) => {
            let temp = {};
            let type = that.data.current.toLowerCase() + "s";
            temp[type] = that.data[type].concat(res.data);
            temp.offset = that.data.offset + that.data.limit;
            temp.tip="没有更多数据";
            temp.tipState=false;
            that.setData(temp);
            
        });
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})