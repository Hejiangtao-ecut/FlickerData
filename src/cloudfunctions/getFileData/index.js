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
    const { fileId } = event;
    const res = await cloud.downloadFile({
        fileID: fileId,
    })
    cloud.deleteFile({
        fileList:[fileId]
    })
    const buffer = res.fileContent;
    const sheet = XLSX.parse(buffer);
    const fileArray = sheet && sheet[0] && sheet[0].data || '';

    if (fileArray && fileArray.length) {
        let title = '';
        const dataTask = [];
        let i = 0;
        while (fileArray[i].length) {
            if (fileArray[i].length === 1) {
                i === 0 ? title = fileArray[i][0] : '';
                i++;
                continue;
            }
            dataTask.push(fileArray[i]);
            i++;
        }
        console.log(title);
        console.log(dataTask);
        title = title.trim();
        return {
            title,
            dataTask
        }
    }


    return;
}