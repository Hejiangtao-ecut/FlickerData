/**
 * @desc 页面基础信息
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
})

// 引入各个文件
const basicInfo = require('./basicInfo/index');
const tplInfo = require('./tplInfo/index');
const tplData = require("./tplData/index");

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case "basicInfo":
            return basicInfo.main(event, context);
        case "tplInfo":
            return tplInfo.main(event, context);
        case "tplData":
            return tplData.main(event, context);
    }
}