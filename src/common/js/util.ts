/**
 * @author hejiangtao
 * @doc util 工具函数
 */

import * as TYPE from './type';

/**
 * showToast
 * @param title 标题
 * @param {Icon}icon 图标
 * @param duration toast 持续时间
 * @param mask 是否展示蒙层
 */
export function showToast(title: string, icon: TYPE.Icon, duration: number = 2000, mask: boolean = false) {
    wx.showToast({
        title,
        icon,
        duration,
        mask
    });
}

/**
 * @doc 展示 loading
 * @param title 标题
 * @param mask 蒙层，防止事件透传
 */
export function showLoading(title: string, mask: boolean = true) {
    wx.showLoading({
        title,
        mask
    });
}


/**
 * 获取云数据库数据
 * @param name 云函数名称
 * @param data 原函数调用参数
 */
export async function getCloudData(name: TYPE.CLOUDNAME, data: TYPE.DATA, retry: boolean = true) {
    return await wx.cloud.callFunction({
        name,
        data
    })
        .then(res => {
            return res.errMsg.includes('cloud.callFunction:ok') ? res.result : '';
        }, rej => retry ? getCloudData(name, data) : rej)
}

/**
 * @doc 跳转页面
 * @param {string} url 跳转地址
 */
export function jumpPage(url: string) {
    wx.navigateTo({
        url
    });
}

export async function selectFile() {
    return await wx.chooseMessageFile({
        count: 1,
        type: 'file'
    })
        .then(res => {
            return res.tempFiles[0].path;
        }, () => {
            showToast('选择文件无效', 'error');
        })
}