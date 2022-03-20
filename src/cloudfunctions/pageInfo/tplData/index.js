/**
 * 获取模板数据
 */

const cloud = require('wx-server-sdk');

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
});

exports.main = async (event, context) => {
    if (!event.tplDataId) {
        return {
            errMsg: "tplDataId error!"
        };
    }
    return cloud.database().collection('tplData')
        .where({
            tplDataId: event.tplDataId
        })
        .get();
}