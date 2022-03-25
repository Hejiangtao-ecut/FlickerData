/**
 * @desc 用户个人信息
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    return {
        event,
        wxContext,
        context
    }
}