/**
 * @desc 用户个人信息
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
})

const openId = require('./getOpenId/index');
const userMessage = require('./getUserMessage/index');
const registerUser = require('./registerUser/index');

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'openId':
            return openId.main(event, context);
        case 'userMessage':
            return userMessage.main(event, context);
        case 'register':
            return registerUser.main(event, context);
    }

}