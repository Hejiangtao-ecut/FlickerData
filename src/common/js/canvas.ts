/**
 * @author hejiangtao
 * @doc canvas 相关函数抽象库
 */

import { showToast, showLoading } from './util';
const echarts = require('../../components/ec-canvas/echarts');


/**
 * @doc 将 canvas 实例保存为图片至本地
 * @param ecComponent canvers实例
 */
export function saveImageToPhotos(ecComponent) {
    showLoading('图片保存中...');
    // 未获取到实例，直接结束保存图片
    if (!ecComponent || !ecComponent.canvasToTempFilePath) {
        wx.hideLoading();
        showToast("保存图片失败", "error");
        return;
    }

    // 先保存图片到临时的本地文件，然后存入系统相册
    ecComponent.canvasToTempFilePath({
        success: res => {
            wx.hideLoading();

            // 存入系统相册
            wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath || '',
                success: () => {
                    showToast("保存图片成功", "success");
                },
                fail: () => {
                    showToast("保存图片失败", "error");
                }
            })
        },
        fail: () => {
            wx.hideLoading();
            showToast("保存图片失败", "error");
        }
    });
}

/**
 * @doc echarts 通用初始化函数
 */
export function initChart(canvas, width, height, dpr) {
    let chart = null;
    chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
    });
    canvas.setChart(chart);

    const option = {}

    chart.setOption(option);
    return chart;
}