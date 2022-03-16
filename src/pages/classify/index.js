/**
 * @file classify/index.js
 * @desc 分类页面
 */

import { checkPageInfoData } from '../../common/js/util';
import {showRequestErrToast} from '../../common/js/showToast';



Page({

    /**
    * 页面的初始数据
    */
    data: {
        list: [],
        selected: 0
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: async function (options) {
        const data = await checkPageInfoData('classify');
        if (!data.checkCode) {
            showRequestErrToast();
            return;
        }
        this.setData({
            list: data.data[0].headList || []
        })
    },

    clicked(e) {
        console.log(e);
        this.setData({
            selected: e.target.dataset.index
        })
    }
})