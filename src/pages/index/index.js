/**
 * @file index/index.js
 * @desc 小程序页面
 */

import { getPageInfo } from '../../common/js/util';

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
        const data = await getPageInfo('index');
        console.log(data);
    }
})