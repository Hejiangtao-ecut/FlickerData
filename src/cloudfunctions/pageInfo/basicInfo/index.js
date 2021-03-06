/**
 * 获取页面结构信息
 */
const cloud = require('wx-server-sdk');

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
});

exports.main = async (event, context) => {
    const pageList = ['index', 'classify', 'inputData'];
    if (!pageList.includes(event.pageName)) {
        return {
            errMsg: 'pageName not found'
        }
    }
    return cloud.database().collection("pageInfo").where({
        pageName: event.pageName
    })
    .get()
}