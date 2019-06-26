// pages/user/user.js
const { $Toast } = require('../../iviewComponent/base/index');
const api = require('../../services/api');
const util = require('../../utils/util');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {
            avatar: "/images/user.png",
            name: "点击头像登陆",
        },
        authVisible: false
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
    wantClick:function(){
        let user = getApp().globalData.userInfo;
        if (user == null) {
            $Toast({
                content: '请先登陆！',
                type: 'warning',
                duration:1
            });
        } else {
            wx.navigateTo({
                url:"/pages/record/record?isWanted=true"
            })
        }
    },
    seenClick:function(){
        let user = getApp().globalData.userInfo;
        if (user == null) {
            $Toast({
                content: '请先登陆！',
                type: 'warning',
                duration: 1
            });
        } else {
            wx.navigateTo({
                url: "/pages/record/record?isWanted=false"
            })
        }
    },
    commentClick:function(){
        let user = getApp().globalData.userInfo;
        if (user == null) {
            $Toast({
                content: '请先登陆！',
                type: 'warning',
                duration: 1
            });
        } else {
            wx.navigateTo({
                url: "/pages/mycomments/mycomments?isWanted=false"
            })
        }
    },
    bindGetUserInfo:function(e){
        let that=this;
        let userInfo = e.detail.userInfo;
        wx.login({
            success(res) {
                let data={
                    code:res.code,
                    user: userInfo
                }
                console.log(data)
                api.request("POST","/login",false,data).then((res)=>{
                    console.log(res.data.openid);
                    let user={
                        name:userInfo.nickName,
                        avatar: userInfo.avatarUrl,
                        id: res.data.openid
                    }
                    
                    getApp().globalData.userInfo = user;
                    wx.setStorage({
                        key: "DBJ_User",
                        data: JSON.stringify(user)
                    })
                    $Toast({
                        content: '登陆成功！',
                        type: 'success',
                        duration: 1
                    });
                    
                    that.setData({
                        user
                    })
                })
            }
        });
    },
    logout:function(){
        let that=this;
        wx.removeStorage({
            key: 'DBJ_User',
            success(res) {
                console.log(res);
                let user = {
                    avatar: "/images/user.png",
                    name: "点击头像登陆"
                };
                $Toast({
                    content: '退出登陆成功！',
                    type: 'success',
                    duration:1
                });
                getApp().globalData.userInfo = null;
                that.setData({
                    user
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
        let user = getApp().globalData.userInfo;
        if (user==null) {
            
        } else {
            
            this.setData({
                user
            });
        }
        
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