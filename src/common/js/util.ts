/**
 * @author hejiangtao
 * @doc util 工具函数
 */

import * as TYPE from './type';

/**
 * @param {string} pageName 页面名称
 * @param {string} type 云函数子类
 * @param {boolean} retry 是否重试，第一次失败默认会重试一次
 * @return object
 */
async function getPageInfo(pageName, retry = true) {
    return await wx.cloud
        .callFunction({
            name: TYPE.PAGEINFO,
            data: {
                pageName,
                type: TYPE.BASICINFO
            }
        })
        .then(res => {
            return res.result;
        }, rej => {
            return retry ? getPageInfo(pageName, false) : rej;
        })
}

/**
 * @param {string} pageName 页面名称
 * @param {string} type 云函数子类
 * @param {boolean} retry 是否重试，第一次失败默认会重试一次
 * @doc 校验请求数据是否正确
 */
export async function checkPageInfoData(pageName, retry = true) {
    const data = await getPageInfo(pageName, retry);
    data.checkCode = data.errMsg.includes('collection.get:ok');
    return data;
}

/**
 * @param {Number} tplNum 模板序号
 * @doc 获取模板列表信息
 */
export async function getTplInfo(tplNum) {
    return await wx.cloud.callFunction({
        name: TYPE.PAGEINFO,
        data: {
            tplNum,
            type: TYPE.TPLINFO
        }
    })
    .then(res => res.result, rej => rej)
}

/**
 * @doc 校验模板信息是否正确
 * @param tplNum 模板编号
 */
export async function checkTplInfo(tplNum) {
    const data = await getTplInfo(tplNum);
    data.checkCode = data.errMsg.includes('collection.get:ok');
    return data;
}

type Icon = "error" | "success" | "loading" | "none";
/**
 * showToast
 * @param title 标题
 * @param {Icon}icon 图标
 * @param duration toast 持续时间
 * @param mask 是否展示蒙层
 */
export function showToast(title:string, icon:Icon, duration:number = 2000, mask:boolean = false) {
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
export function showLoading(title:string, mask:boolean = true) {
    wx.showLoading({
        title,
        mask
    });
}