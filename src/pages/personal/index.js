/**
 * @file personal/index.js
 * @desc 个人中心
 */

import { USERINFO, USERMESSAGE, REGISTER, UPAVATAR, UPNICKNAME } from '../../common/js/type';
import { getCloudData, showLoading, upLoadAvatar } from '../../common/js/util';

const App = getApp();

Page({

    /**
    * 页面的初始数据
    */
    data: {
        avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
        nickName: "微信用户",
        dataList: [],
        addUrl: 'https://666c-flickerdata-4ghcwynx39ecd176-1304585141.tcb.qcloud.la/FlickerImg/%E6%B7%BB%E5%8A%A0.png?sign=25c7fc7e285af8dde6d787da8d803808&t=1648277795'
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        showLoading('数据加载中....');
        console.log(App.globalData);
        this.getUserInfo();

    },

    getUserInfo() {
        getCloudData(USERINFO, {
            type: USERMESSAGE
        })
            .then(res => {
                    const { dataList } = res.data[0];
                    this.setData({
                        dataList
                    })
                }
            ).finally(() => {
                wx.hideLoading();
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

    /**
     * 开启更改昵称
     */
    changeName() {
        this.setData({
            isClick:true
        })
    },

    // 保存昵称
    pushNickName(e) {
        this.setData({
            isClick: false,
            nickName: e.detail.value
        });

        // 同步云端
        getCloudData(USERINFO, {
            type: UPNICKNAME,
            nickName: e.detail.value
        });
    },

    /**
     * 跳转首页
     */
    jumpIndex() {
        wx.switchTab({url: "/pages/index/index"})
    }

})