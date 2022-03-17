/**
 * @author hejiangtao
 * @doc util 工具函数
 */

/**
 * @param {string} pageName 页面名称
 * @param {string} type 云函数子类
 * @param {boolean} retry 是否重试，第一次失败默认会重试一次
 * @return object
 */
async function getPageInfo(pageName, type, retry = true) {
    return await wx.cloud
        .callFunction({
            name: 'pageInfo',
            data: {
                pageName,
                type
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
export async function checkPageInfoData(pageName, type, retry = true) {
    const data = await getPageInfo(pageName, type, retry);
    data.checkCode = data.errMsg.includes('collection.get:ok');
    console.log(data.checkCode);
    return data;
}
