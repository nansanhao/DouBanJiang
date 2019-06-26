// pages/detail/detail.js
const api = require('../../services/api');
const {
    $Toast
} = require('../../iviewComponent/base/index');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible:false,
        offset: 0,
        limit: 5,
        tip: "上拉加载更多",
        tipState: false,
        type: "",
        isSeen: false,
        rate: 0,
        introduction: "",
        user_comment: {},
        movie: {},
        comments: [],
        song: {},
        book: {}

    },
    handleViewed: function(e) {
        let user = getApp().globalData.userInfo;
        if (user == null) {
            wx.switchTab({
                url: '/pages/user/user'
            })
        } else {
            let ids = {
                book: "b_id",
                movie: "mo_id",
                song: "mu_id"
            };
            let item = this.data[this.data.type];
            let id = item[ids[this.data.type]];
            let url="";
            if (this.data.isSeen) {
                url = '/pages/comment/comment?type=' + this.data.type + "&id=" + id + "&rate=" + this.data.user_comment.score + "&comment=" + this.data.user_comment.comment;
            }else{
                url = '/pages/comment/comment?type=' + this.data.type + "&id=" + id;
            }

            wx.navigateTo({
                url
            })
        }

    },
    handleClick: function() {
        let user = getApp().globalData.userInfo;
        if (user == null) {
            wx.switchTab({
                url: '/pages/user/user'
            })
        } else {

            let types = {
                book: "Book",
                movie: "Movie",
                song: "Song"
            };
            let ids = {
                book: "b_id",
                movie: "mo_id",
                song: "mu_id"
            };
            let item = this.data[this.data.type];
            let id = item[ids[this.data.type]];
            let data = {
                id: id,
                type: types[this.data.type],
                session_id: getApp().globalData.userInfo.id,
            }
            api.request("POST", "/want", false, data).then((res) => {
                if (res.data == "ok") {
                    $Toast({
                        content: '标记为想看成功！',
                        type: 'success'
                    });
                } else {
                    $Toast({
                        content: '您已经标记过！',
                        type: 'warning'
                    });
                }
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let user = getApp().globalData.userInfo;
        let id = options.id;
        let route = "/" + options.type + "s/" + options.id;

        if (user == null) {
            route += "?islogin=0";
        } else {
            route += "?islogin=1&session_id=" + user.id;
        }

        api.request("GET", route, true).then((res) => {
            // let temp = res.data.mo_introduction;
            // temp=temp.replace("/n","")
            // res.data.mo_introduction=temp;
            let detail = {};
            detail[options.type] = res.data;
            detail.type = options.type;

            let pres = {
                book: "b_",
                movie: "mo_",
                song: "mu_"
            };
            let pre = "";
            pre = pres[options.type] + "introduction";
            detail.introduction = res.data[pre];
            pre = pres[options.type] + "score";

            if (res.data.is_seen && res.data.is_seen == 1) {
                detail.isSeen = true;
                detail.user_comment = res.data["Comments"];
            }
            detail.rate = (res.data[pre] / 2).toFixed(1);
            detail.comments = res.data.comments;
            detail.offset=res.data.comments.length;
            detail.visible=true;
            that.setData(detail);

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
        let that = this;
        let pres = {
            book: "b_",
            movie: "mo_",
            song: "mu_"
        };
        let user = getApp().globalData.userInfo;
        let type = this.data.type;
        let item = this.data[type];
        let idType = pres[type] + "id"
        let id = item[idType];
        let route = "/" + type + "s/" + id;

        if (user == null) {
            route += "?islogin=0";
        } else {
            route += "?islogin=1&session_id=" + user.id;
        }
        api.request("GET", route, false).then((res) => {
            // let temp = res.data.mo_introduction;
            // temp=temp.replace("/n","")
            // res.data.mo_introduction=temp;
            let detail = {};
            detail[type] = res.data;
            detail.type = type;


            let pre = "";
            pre = pres[type] + "introduction";
            detail.introduction = res.data[pre];
            pre = pres[type] + "score";

            if (res.data.is_seen && res.data.is_seen == 1) {
                detail.isSeen = true;
                detail.user_comment = res.data["Comments"];
            }
            detail.rate = (res.data[pre]).toFixed(1);
            detail.comments = res.data.comments;
            that.setData(detail);
            wx.stopPullDownRefresh(); //刷新完成后停止下拉刷新动效

        })


    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.setData({
            tip:"加载中",
            tipState:true
        });
        let pres = {
            book: "b_",
            movie: "mo_",
            song: "mu_"
        };
        let that=this;
        let user = getApp().globalData.userInfo;
        let idType = pres[this.data.type]+"id";
        let item = this.data[this.data.type];
        let route = "/" + this.data.type + "s/" + item[idType] + "/comments?offset=" + this.data.offset +"&limit="+this.data.limit;
        console.log(route);
        api.request("GET",route,false).then((res)=>{
            let temp={};
            temp.tip="没有更多评论";
            temp.tipState=false;
            temp.comments=that.data.comments.concat(res.data);
            that.setData(temp);
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})