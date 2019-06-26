// pages/record/record.js
const api = require('../../services/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        offset:0,
        limit:5,
        tip:"上拉加载更多",
        tipState:false,
        isWanted:true,
        current: 'Movie',
        verticalCurrent: 0,
        movies: [],
        books: [],
        songs: []

    },
    handleChange({
        detail
    }) {
        let user = getApp().globalData.userInfo;
        
        let route="";
        if(this.data.isWanted){
            route = "/" + detail.key.toLowerCase() + "s/want?session_id=" + user.id + "&offset=0&limit="+this.data.limit;
        }else{
            let types = {
                Movie: "/movies/seen",
                Song: "/songs/listened",
                Book: "/books/viewed"
            };
            route = types[detail.key] + "?session_id=" + user.id + "&offset=0&limit="+this.data.limit;
        }
        console.log(route)
        api.request("GET",route,true).then((res) => {
            let type = this.data.current.toLowerCase()+"s";
            let temp={};
            temp[type]=res.data;
            temp.offset=0+this.data.limit;
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
        let that=this;
        let title = '';
        

        let user = getApp().globalData.userInfo;

        if (options.isWanted == 'true') {
            title = "想 - 看/听/读"
            api.request("GET", "/movies/want?session_id=" + user.id + "&offset=0&limit="+that.data.limit,true).then((res) => {
                if(res.data.length<that.data.limit){
                    that.setData({
                        tip:"没有更多数据"
                    })
                };
                that.setData({
                    movies: res.data,
                    isWanted:true,
                    offset:this.data.limit
                })
            })
        } else {
            title = "看/听/读 - 过"
            api.request("GET", "/movies/seen?session_id=" + user.id + "&offset=0&limit="+that.data.limit,true).then((res) => {
                if (res.data.length < that.data.limit) {
                    that.setData({
                        tip: "没有更多数据"
                    })
                }
                that.setData({
                    movies: res.data,
                    isWanted: false,
                    offset: this.data.limit
                })
            })
        }
        wx.setNavigationBarTitle({
            title: title
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
            tipState:true,
            tip:"正在加载"
        })
        let user = getApp().globalData.userInfo;

        let route = "";
        let type=this.data.current;
        if (this.data.isWanted) {
            route = "/" + type.toLowerCase() + "s/want?session_id=" + user.id + "&offset="+this.data.offset+"&limit=" + this.data.limit;
        } else {
            let types = {
                Movie: "/movies/seen",
                Song: "/songs/listened",
                Book: "/books/viewed"
            };
            route = types[type] + "?session_id=" + user.id + "&offset="+this.data.offset+"&limit=" + this.data.limit;
        }
        console.log(route)
        api.request("GET", route).then((res) => {
            let type = this.data.current.toLowerCase() + "s";
            let temp = {};
            temp[type] = this.data[type].concat(res.data);
            temp.offset = this.data.offset + this.data.limit;
            temp.tipState=false;
            temp.tip="没有更多数据"
            this.setData(temp);
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})