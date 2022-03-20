/**
 * @file index/index.js
 * @desc 小程序页面
 */

import { getCloudData, showToast, showLoading } from '../../common/js/util';
import { PAGEINFO, BASICINFO } from '../../common/js/type';

Page({

    /**
    * 页面的初始数据
    */
    data: {
        inputModel: []
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: async function (options) {
        showLoading('数据加载中...', true);
        const data = await getCloudData(PAGEINFO, {
            type: BASICINFO,
            pageName: 'index'
        });
        if (!data?.data?.[0]) {
            showToast('网络错误', 'error');
            return;
        }
        this.setData({
            inputModel: data.data?.[0]?.inputModel ?? []
        })
        wx.hideLoading();
    }
})