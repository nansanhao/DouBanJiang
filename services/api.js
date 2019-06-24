const config = {
    BASE_URL: "http://cyice.cn"
};

/**
 * 支持Promise
 * @param {string} path 路径
 * @param {Array} data 数据 GET不支持
 * @param {string} method 请求的方法
 * @param {boolean} showLoading 过程中是否展示加载层
 */
function promiseRequest(method = 'GET', path, showLoading = false, data,auth="false",header = {}) {
    return new Promise((reslove, reject) => {

        //1.展示加载层
        if (showLoading === true) {
            wx.showLoading({
                title: '努力中...'
            });
        }
        let token = getApp().globalData.token;
        if (token == ""&&auth==true) {
            wx.navigateTo({
                url: '/pages/user/user?type="auth"'
            }); //如果没有授权,需要重新跳转到授权页面
        } else {
            wx.request({
                method: method,
                url: config.BASE_URL + path,
                data: data,
                header: {
                    'Content-Type': 'application/json', // 默认值
                    //'cookie': wx.getStorageSync("sessionid"),
                    //'token': wx.getStorageSync("token"),
                    'Token': getApp().globalData.token,
                    ...header
                },
                success: (res) => {
                    reslove(res);
                },
                fail: (err) => {
                    wx.showToast({
                        title: '请求错误',
                        icon: "none"
                    });
                    reject(err);
                },
                complete: () => {
                    wx.hideLoading();
                }
            })
        }

    });
}

/**
 * 处理失败不是200 statusCode的请求
 * @param {object} res 
 */
function handleFailRequest(res) {
    switch (res.code) {
        case 1014:
            //未绑定俱乐部的错误
            wx.redirectTo({
                url: '/pages/passport/bindClub'
            });
            break;
        case 1015:
            //未绑定会员的错误
            //wx.redirectTo({ url: '/pages/passport/bindVipUser' });
            wx.navigateTo({
                url: '/pages/webview/webview?webUrl=' + WEB_SERVICE_PAGES.MEMBER_CARD_AUTH + getApp().globalData.clubAuthCode
            });
            break;
        case 1500:
            //其他
            break;
        default:
            break;
    }
}

module.exports = {
    request: promiseRequest,
    BASE_URL: config.BASE_URL,
    config: config
}