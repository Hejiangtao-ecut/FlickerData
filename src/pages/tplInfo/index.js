/**
 * @file tplInfo/index.js
 * @desc 模板预览页面
 */

import * as echarts from '../../components/ec-canvas/echarts';
import { saveImageToPhotos } from '../../common/js/canvas';

function initChart() {
    const [canvas, width, height, dpr] = arguments;
    console.log(arguments);
    // console.log(canvas, width, height, dpr);
    let chart = null;
    chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    const option = {"series":[{"data":[820,932,901,934,1290,1330,1320],"type":"line"}],"xAxis":{"data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"type":"category"},"yAxis":{"type":"value"}}

    chart.setOption(option);
    return chart;
}

Page({
    data: {
        ec: {
            onInit:''
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