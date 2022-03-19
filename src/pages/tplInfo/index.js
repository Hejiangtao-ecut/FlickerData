/**
 * @file tplInfo/index.js
 * @desc 模板预览页面
 */

import { saveImageToPhotos, initChart } from '../../common/js/canvas';

Page({
    data: {
        ec: {
            onInit:initChart
        },
        clicked: false
    },

    /**
     * 保存图片至本地
     */
    save() {
        saveImageToPhotos(this.selectComponent('#mychart-dom-bar'));
    }
});