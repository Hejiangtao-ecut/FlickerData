/**
 * @author hejiangtao
 * @doc canvas 相关函数抽象库
 */

import { showToast, showLoading } from './util';
const echarts = require('../../components/ec-canvas/echarts');

/**
 * 申请授权并保存图片
 */
export function authSaveImage(ecComponent) {
    const App = getApp();
    wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success(e) {
            App.globalData.isWritePhotosAlbum = true;
            saveImageToPhotos(ecComponent);
        },
        fail(e) {
            showToast('授权失败', 'error');
        }
    })
}

export async function saveUserEcImg(ecComponent) {
    // 未获取到实例，直接结束保存图片
    if (!ecComponent || !ecComponent.canvasToTempFilePath) {
        wx.hideLoading();
        return;
    };

    return new Promise((res, rej) => {
        // 先保存图片到临时的本地文件，然后存入系统相册
        ecComponent.canvasToTempFilePath({
            success: (e) => {
                wx.cloud.uploadFile({
                    cloudPath: `userEcImg/${+new Date()}.png`,
                    filePath: e.tempFilePath,
                    success: (e) => {
                        res(e);
                    },
                    fail: (e) => {
                        rej(e);
                    }
                })
            },
            fail: (e) => {
                rej(e);
            }
        })
    })
}

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