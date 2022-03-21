/**
 * @file tplInfo/index.js
 * @desc 模板预览页面
 */

import { saveImageToPhotos, initChart } from '../../common/js/canvas';
import { getCloudData } from '../../common/js/util';
import {PAGEINFO, TPLDATA} from '../../common/js/type';

Page({
    data: {
        ec: {
            onInit: initChart
        },
        hasChart:false,
        clicked: false,
    },

    /**
    * 生命周期函数--监听页面加载
    */
    async onLoad(options) {
        const { tplInfoId } = options;
        const tplData = await getCloudData(PAGEINFO, {
            type: TPLDATA,
            tplDataId: tplInfoId
        });
        console.log(tplData.data[0].tplData);
        // console.log(JSON.parse(tplData.data[0].tplData));
        if (tplData?.data?.[0]) {
            this.chart.setOption(tplData.data[0].tplData);
        }
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