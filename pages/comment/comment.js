// pages/comment/comment.js
const api = require('../../services/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        rate:0,
        type:"",
        id:"",
        comment:""
    },
    onChange:function(e){
        const index = e.detail.index;
        this.setData({
            'rate': index
        })
    },
    commentInput:function(e){
        this.setData({
            comment: e.detail.value
        })
    },
    commentSubmit:function(){
        let types={
            book:"Book",
            movie:"Movie",
            song:"Song"
        }
        let data={
            type: types[this.data.type],
            id:this.data.id,
            session_id: getApp().globalData.userInfo.id,
            score:this.data.rate,
            comment:this.data.comment
        };
        api.request("POST", "/comment" , false,data).then((res) => {
            console.log(res.data)
            wx.navigateBack({
                delta: 1
            })
            

        })

        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        this.setData(options)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})