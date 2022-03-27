/**
 * @author hejiangtao
 * @doc util 工具函数
 */

import * as TYPE from './type';

/**
 * showToast
 * @param title 标题
 * @param {Icon}icon 图标
 * @param duration toast 持续时间
 * @param mask 是否展示蒙层
 */
export function showToast(title: string, icon: TYPE.Icon, duration: number = 2000, mask: boolean = false) {
    wx.showToast({
        title,
        icon,
        duration,
        mask
    });
}

/**
 * @doc 展示 loading
 * @param title 标题
 * @param mask 蒙层，防止事件透传
 */
export function showLoading(title: string, mask: boolean = true) {
    wx.showLoading({
        title,
        mask
    });
}


/**
 * 获取云数据库数据
 * @param name 云函数名称
 * @param data 原函数调用参数
 */
export async function getCloudData(name: TYPE.CLOUDNAME, data: TYPE.DATA, retry: boolean = true) {
    return await wx.cloud.callFunction({
        name,
        data
    })
        .then(res => {
            return res.errMsg.includes('cloud.callFunction:ok') ? res.result : '';
        }, rej => {
            if (!retry) {
                return rej;
            }
            getCloudData(name, data, false);
        });
}

/**
 * @doc 跳转页面
 * @param {string} url 跳转地址
 */
export function jumpPage(url: string) {
    wx.navigateTo({
        url
    });
}

/**
 * @doc 选择文件
 */
export async function selectFile() {
    return await wx.chooseMessageFile({
        count: 1,
        type: 'file'
    })
        .then(res => {
            return res.tempFiles[0].path;
        }, () => {
            showToast('选择文件无效', 'error');
        })
}

/**
 * @doc 上传文件至云端，云端读取数据后会自动删除云端记录
 * @param {string} path 文件地址
 */
export async function upLoadFile(path: string) {
    return await wx.cloud.uploadFile({
        cloudPath: `${+new Date()}.xls`,
        filePath: path, // 文件路径
    }).then(res => {
        return res.fileID
    }).catch(() => {
        showToast('解析文件失败', 'error');
    })
}

/**
 * @doc 上传头像至云端
 * @param {string} path 文件地址
 */
export async function upLoadAvatar(path: string) {
    return await wx.cloud.uploadFile({
        cloudPath: `userAvatar/${+new Date()}.png`,
        filePath: path, // 文件路径
    }).then(res => {
        return res.fileID
    }).catch(() => {
        showToast('解析文件失败', 'error');
    })
}

/**
 * @doc 选择文件
 */
export async function chooseImg() {
    return await wx.chooseImage({
        count: 1
    })
        .then(res => res.tempFilePaths[0])
        .catch(() => { showToast('请再次选择图片', 'error'); });
}

/**
 * @doc 复制内容到剪贴板
 */
export function setClipboardData(data) {
    wx.setClipboardData({
        data,
        fail:() => {
            showToast('复制失败', 'error');
        }
    })
}