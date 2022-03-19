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
        clicked: false
    },

    demo(e) {
        // 获取 chart，进行数据操纵
        console.log('demo----');
        console.log(e);
    },

    /**
     * 保存图片至本地
     */
    save() {
        // saveImageToPhotos(this.selectComponent('#mychart-dom-bar'));

        const x = wx.createSelectorQuery().in(this);
        console.log(x.selectAll('.container'));
    }
});