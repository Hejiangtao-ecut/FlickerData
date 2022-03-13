/**
 * @desc 页面基础信息
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 引入各个文件
const basicInfo = require('./basicInfo/index');

// 云函数入口函数
exports.main = async (event, context) => {
    return basicInfo.main(event, context)
}