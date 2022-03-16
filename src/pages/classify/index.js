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

    /**
     * 更改 selected 同步头部导航下面 item
     */
    changeSelect(e) {
        this.setData({
            selected: e.target.dataset.index
        })
    },

    /**
     * 获取当前的 swiper item
     */
    getCurrent(event) {
        if (event.detail.source) {
            this.setData({
                selected: event.detail.current
            })
        }
    }
})