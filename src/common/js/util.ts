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
    console.log(data.checkCode);
    return data;
}

/**
 * @doc 获取模板列表数据
 */
export async function getTplInfo(tplNum, type) {
    return await wx.cloud.callFunction({
        name: ''
    })
}

