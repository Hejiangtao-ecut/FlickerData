/**
 * @file index/index.js
 * @desc 小程序页面
 */

import { checkPageInfoData } from '../../common/js/util';
import {showRequestErrToast} from '../../common/js/showToast';

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
        const data = await checkPageInfoData('index');
        if (!data.checkCode) {
            showRequestErrToast();
            return;
        }
        this.setData({
            inputModel: data.data[0]?.pageInfo?.inputModel ?? []
        })
    }
})