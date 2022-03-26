const cloud = require('wx-server-sdk');

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext();
    const _ = cloud.database().command;

    return cloud.database().collection("userInfo").where({
        openId: OPENID
    }).update({
        data: {
            dataList: _.push(event.dataItem)
        }
    })
};