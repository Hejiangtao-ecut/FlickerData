// 入口文件
const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
    const a = event.a;
    const b = event.b;
    return a + b;
}