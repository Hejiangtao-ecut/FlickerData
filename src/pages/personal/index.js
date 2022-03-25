/**
 * @file personal/index.js
 * @desc 个人中心
 */

import { USERINFO, USERMESSAGE, REGISTER, UPAVATAR } from '../../common/js/type';
import { getCloudData, showLoading, upLoadAvatar } from '../../common/js/util';

const App = getApp();

Page({

    /**
    * 页面的初始数据
    */
    data: {
        avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
        nickName: "微信用户",
        dataList: []
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        console.log(App.globalData);
        this.getUserInfo();

    },

    getUserInfo() {
        getCloudData(USERINFO, {
            type: USERMESSAGE
        })
            .then(res => {
                if (res.data.length) {
                    // 老用户
                    const { dataList, nickName, avatarUrl } = res.data[0];
                    this.setData({
                        dataList,
                        avatarUrl,
                        nickName
                    })
                    return;
                }
                // 新用户，注册数据
                getCloudData(USERINFO, {
                    type: REGISTER
                })
            });
    },

    changeAvarat(e) {
        showLoading('头像更新中...');
        const { avatarUrl } = e.detail;
        wx.saveFile({
            tempFilePath: avatarUrl,
            success: (res) => {
                const savedFilePath = res.savedFilePath;
                upLoadAvatar(savedFilePath).then(res => {
                    this.setData({
                        avatarUrl: res
                    });
                    getCloudData(USERINFO, {
                        type: UPAVATAR,
                        avatarUrl: res
                    })
                });
            },
            complete: () => {
                wx.hideLoading();
            }
        });
    },

    ccc() {
        this.setData({
            isClick: true
        })
    }
})