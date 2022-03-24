/**
 * @desc 获取文件数据
 */

// 云函数入口文件
const cloud = require('wx-server-sdk');
var XLSX = require('node-xlsx');

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
})

// 云函数入口函数
exports.main = async (event, context) => {
    // event.fileData.length = event.length;
    // const arrayBuffy = new Uint8Array(event.fileData);
    // const length = arrayBuffy.length;





    const res = await cloud.downloadFile({
        fileID: 'cloud://flickerdata-4ghcwynx39ecd176.666c-flickerdata-4ghcwynx39ecd176-1304585141/1821802班级学生核酸检测时间表 上午11.45.03.xlsx',
    })
    const buffer = res.fileContent;
    console.log(buffer);
    const sheets = XLSX.parse(buffer);
    const length = sheets.length;


    return {
        sheets,
        length
    }
}