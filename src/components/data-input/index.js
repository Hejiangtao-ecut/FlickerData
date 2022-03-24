/**
 * @file data-input/index.js
 * @desc 数据输入样式组件
 */

import { getCloudData, jumpPage, selectFile, showLoading, showToast, upLoadFile } from '../../common/js/util';

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
                    console.log('selectFile');
                    const filePath = await selectFile();
                    showLoading('数据解析中...')
                    const fileId = await upLoadFile(filePath);
                    const fileData = await getCloudData('getFileData', {
                        fileId
                    });
                    if (fileData) {
                        wx.hideLoading();
                        showToast('数据解析成功', 'success');
                        wx.navigateTo({
                            url: this.data.itemData.url,
                            success: function(res) {
                                // 通过eventChannel向被打开页面传送数据
                                res.eventChannel.emit('acceptDataFromOpenerPage', { data:fileData })
                            }
                        })
                    }
                },
                "photograph": () => {
                    console.log('photograph');
                }
            }
            eventTap[tap]();
        },
        touchstart() {
            // 触摸事件开始
            this.setData({
                hasClick: true
            })
        },
        touchend() {
            // 触摸事件结束
            this.setData({
                hasClick: false
            })
        }

    }
})
