/**
 * @file classify/index.js
 * @desc 分类页面
 */

import { getCloudData, showToast, showLoading } from '../../common/js/util';
import { PAGEINFO, BASICINFO } from '../../common/js/type';



Page({

    /**
    * 页面的初始数据
    */
    data: {
        /**
         * 头部列表
         */
        list: [],
        /**
         * 选中元素
         */
        selected: 0
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: async function (options) {
        showLoading('数据加载中...', true);
        const data = await getCloudData(PAGEINFO, {
            type: BASICINFO,
            pageName: 'classify'
        });
        if (!data?.data?.[0]) {
            showToast('网络错误', 'error');
            return;
        }
        this.setData({
            list: data?.data?.[0].headList || []
        });
        wx.hideLoading();
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