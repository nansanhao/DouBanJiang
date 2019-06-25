// pages/detail/detail.js
const api = require('../../services/api');
const { $Toast } = require('../../iviewComponent/base/index');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: "",
        rate: 0,
        introduction: "",
        movie: {
            name: "最好的我们",
            imgUrl: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2557157554.jpg",
            date: "2019",
            tags: "喜剧 动作 科幻",
            rate: 4.7,
            origin: "美国",
            length: "110分钟",
            introduction: "每个人的心里大概都藏着一个念念不忘的人。一个偶然被提及的名字，让女摄影师耿耿（何蓝逗 饰）内心掀起万千波澜，触动了回忆的开关，那个撩人心动的少年余淮（陈飞宇 饰）再度闯进她的思绪。 "

        },
        comments: [{
                user: {
                    name: "南三号",
                    avatar: "http://p1.music.126.net/T4ro14ASzPXedQ1VbovgWQ==/109951164090469005.jpg?param=180y180"
                },
                rate: 3.5,
                date: "2019-6-1",
                content: "八月长安只手撑起国产青春一片天，女主角真的蛮可爱，躲躲闪闪的样子很有青春味了。这演学霸毫无说服力啊！然后又帅得很不日常，完全不像会出现在谁的青春里的样子，搞得我们老少女想寄情都寄不出去。纯爱青春片最重要的就是男主角，而男主角最重要的不是有多帅，是要帅得触手可及啊！"
            },
            {
                user: {
                    name: "雾与晨的杂货店",
                    avatar: "http://p1.music.126.net/ma8NC_MpYqC-dK_L81FWXQ==/109951163250233892.jpg?param=180y180"
                },
                rate: 3.5,
                date: "2019-6-1",
                content: "女Vocal是来自美国🇺🇸年仅17岁的Noah Cyrus,声线清纯自然,同时塞勒斯是名演员,年纪轻轻非常有才华。男Vocal是来自英国🇬🇧的Digital Farm Animals。艾伦沃克凭借自己超高的人气一举夺得DJ Mag百大第17位！"
            },
            {
                user: {
                    name: "HI我是念木槿",
                    avatar: "http://p2.music.126.net/73tEDRC4zK40BPBi-BNgTQ==/18777459581328172.jpg?param=180y180"
                },
                rate: 3.5,
                date: "2019-6-1",
                content: "无疑Alan Walker是北欧的电音奇才，我无法想象他在17岁前经历了什么有了哪些感悟引发了一场与电音艺术的交流，而我又在17岁时做了些什么。怀着不一样的心境和心情，与全世界不同的角落里的年轻人一同欣赏All Falls Down吧，我想带给他们的力量和感受也不相同吧。"
            },
            {
                user: {
                    name: "夜晚和下雨天更配",
                    avatar: "http://p2.music.126.net/qnxftvmMq-1bD32sCpynEw==/109951162829970616.jpg?param=180y180"
                },
                rate: 3.5,
                date: "2019-6-1",
                content: "女Vocal是来自美国🇺🇸年仅17岁的Noah Cyrus,声线清纯自然,同时塞勒斯是名演员,年纪轻轻非常有才华。男Vocal是来自英国🇬🇧的Digital Farm Animals。艾伦沃克凭借自己超高的人气一举夺得DJ Mag百大第17位！"
            }
        ],
        song: {},
        book: {}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let id = options.id;

        api.request("GET", "/" + options.type + "s/" + options.id, false).then((res) => {
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
            detail.rate = res.data[pre] / 2;
            //detail.comments = res.data.comments;
            this.setData(detail)

        })

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
            wx.navigateTo({
                url: '/pages/comment/comment?type=' + this.data.type + "&id=" + id
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
            api.request("POST","/want",false,data).then((res)=>{
                if(res.data=="ok"){
                    $Toast({
                        content: '标记为想看成功！',
                        type: 'success'
                    });
                }else{
                    $Toast({
                        content: '您已经标记过！',
                        type: 'warning'
                    });
                }
            })
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