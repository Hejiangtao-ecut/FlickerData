/**
 * @file tplInfo/index.js
 * @desc 模板预览页面
 */

import { saveImageToPhotos, initChart } from '../../common/js/canvas';

Page({
    data: {
        ec: {
            onInit: initChart
        },
        hasChart:false,
        clicked: false,
    },

    /**
     * @doc 获取 chart 实例
     * @param {*} e.detail chart 实例
     */
    getChart(e) {
        // 获取 chart，进行数据操纵
        if (e.detail) {
            this.chart = e.detail;
            this.setData({
                hasChart: true
            })
        }
    },

    /**
     * 保存图片至本地
     */
    save() {
        saveImageToPhotos(this.selectComponent('#mychart-dom-bar'));
    }
});