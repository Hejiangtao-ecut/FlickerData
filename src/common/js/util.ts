/**
 * @author hejiangtao
 * @doc util 工具函数
 */

/**
 * @param {string} pageName 页面名称
 * @param {boolean} retry 是否重试，第一次失败默认会重试一次
 * @return object
 */
export async function getPageInfo(pageName, retry = true) {
    return await wx.cloud.callFunction({
        name: 'pageInfo',
        data: {
            pageName
        }
    })
        .then(res=> res.result.errMsg ? reject('err') : res.result)
        .then(res => {
            console.log(res);
            return res;
        }, rej => {
            console.log(rej)
            return retry ? getPageInfo(pageName, false) : rej;
        })
}