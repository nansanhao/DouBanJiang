// pages/user/user.js
const {$Message} = require('../../iviewComponent/base/index');
const api = require('../../services/api');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {
            avatar: "https://img3.doubanio.com/icon/ul189518171-1.jpg",
            name: "七个南三号"
        },
        authVisible: false,

        actions2: [{
            name: '删除',
            color: '#ed3f14'
        }]
    },
    authClick() {
        this.setData({
            authVisible: true
        });
    },

    authCancel() {
        this.setData({
            authVisible: false
        });
    },
    authAllow() {
        console.log("允许授权");
        this.setData({
            authVisible: false
        });
        // const action = [...this.data.actions2];
        // action[0].loading = true;

        // this.setData({
        //     actions2: action
        // });

        // setTimeout(() => {
        //     action[0].loading = false;
        //     this.setData({
        //         authVisible: false,
        //         actions2: action
        //     });
        //     $Message({
        //         content: '删除成功！',
        //         type: 'success'
        //     });
        // }, 2000);
    },

    authorize: function() {
        console.log("授权");
        this.setData({
            authVisible: true
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.type == "auth") {
            this.setData({
                authVisible: true
            });
        } else {

        }
        api.request("GET", "/movies/1",false).then((res) => {
            console.log(res.data);
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})