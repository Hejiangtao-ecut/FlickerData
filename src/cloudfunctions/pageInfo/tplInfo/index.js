/**
 * 获取分类列表模板信息
 */

const cloud = require('wx-server-sdk');

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
});

exports.main = async (event, context) => {
    if (event.pageNum > 21) {
        return {
            errMsg: "pageNum error!"
        };
    }
    return cloud.database().collection('tplInfo')
        .where({
            pageNum: event.pageNum
        })
        .get()
}