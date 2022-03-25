const cloud = require('wx-server-sdk');

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
    // 获取基础信息
    const wxContext = cloud.getWXContext();
    return {
        openid: wxContext.OPENID
    };
};