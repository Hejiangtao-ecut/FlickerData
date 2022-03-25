/**
 * @file data-input/index.js
 * @desc 数据输入样式组件
 */

import {
    chooseImg, getCloudData,
    jumpPage, selectFile,
    showLoading, showToast, upLoadFile
} from '../../common/js/util';
import { TOKEN, FORMDATA } from '../../common/js/type';

Component({
    /**
    * 组件的属性列表
    */
    properties: {
        itemData: Object,
        serialId: Number
    },

    /**
    * 组件的初始数据
    */
    data: {
        hasClick: false
    },

    /**
    * 组件的方法列表
    */
    methods: {
        hasClick() {
            const eventList = ["jumpInput", "selectFile", "photograph"];
            const tap = eventList[this.data.serialId];
            const eventTap = {
                "jumpInput": () => {
                    jumpPage(this.data.itemData.url);
                },
                "selectFile": async () => {
                    const filePath = await selectFile();
                    // 给个友好提示
                    showLoading('数据解析中...');
                    const fileId = await upLoadFile(filePath);
                    // 获取到文件处理信息
                    const fileData = await getCloudData('getFileData', {
                        fileId
                    });
                    wx.hideLoading();

                    // 未获取到数据则提示失败
                    if (!fileData) {
                        showToast('数据解析失败', ' fail');
                        return;
                    }

                    showToast('数据解析成功', 'success');
                    this.jumpWithData(fileData);
                },
                "photograph": async () => {
                    const path = await chooseImg();
                    if (!path) {
                        return;
                    }
                    const fs = wx.getFileSystemManager();
                    fs.readFile({
                        filePath: path,
                        encoding: 'base64',
                        success(res) {
                            const fileData = res.data;
                            wx.request({
                                url: TOKEN,
                                success(res) {
                                    // 获取到 token
                                    const { access_token } = res.data;
                                    wx.request({
                                        url: `${FORMDATA}${access_token}&`,
                                        method: 'POST',
                                        header: {
                                            "content-type": 'application/x-www-form-urlencoded'
                                        },
                                        data: {
                                            image: fileData
                                        },
                                        success(res) {
                                            console.log(res);
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
            eventTap[tap]();
        },

        /**
         * 携带数据跳转
         */
        jumpWithData(fileData) {
            wx.navigateTo({
                url: this.data.itemData.url,
                success: function (res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('acceptDataFromOpenerPage', { data: fileData })
                },
                fail: () => {
                    showToast('页面地址错误', 'error');
                }
            })
        },

        /**
         * 触摸事件开始
         */
        touchstart() {
            this.setData({
                hasClick: true
            });
            // 增加点击态，.5秒后自动结束
            setTimeout(() => {
                this.setData({
                    hasClick: false
                })
            }, 500);
        }
    }
})
