/**
 * @desc 用户个人信息
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
})

const userMessage = require('./getUserMessage/index');
const registerUser = require('./registerUser/index');
const upAvatar = require('./upAvata/index');
const upNickName = require('./upNickName/index');
const addUserData = require('./addUserData/index');
const addDataList = require('./addDataList/index');

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'userMessage':
            // 获取用户信息
            return userMessage.main(event, context);
        case 'register':
            // 注册新用户
            return registerUser.main(event, context);
        case 'upAvatar':
            // 更新用户头像
            return upAvatar.main(event, context);
        case 'upNickName':
            // 更新用户昵称
            return upNickName.main(event, context);
        case 'addUserData':
            // 添加一条用户可视化数据到数据库，未同步到用户名下
            return addUserData.main(event, context);
        case 'addDataList':
            // 将新添加的数据同步到用户名下
            return addDataList.main(event, context);
    }

}