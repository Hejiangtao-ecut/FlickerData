const cloud = require('wx-server-sdk');

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
    // 获取基础信息
    const { OPENID } = cloud.getWXContext();
    return cloud.database().collection("userInfo").add({
        data: {
            openId: OPENID,
            nickName: '微信用户',
            avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
            dataList: []
        }
    })
};