/**
 * @file data-input/index.js
 * @desc 数据输入样式组件
 */

import { jumpPage, selectFile } from '../../common/js/util';

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
                    console.log(filePath);
                    const fs = wx.getFileSystemManager();
                    // wx.cloud.callFunction({
                    //     name: 'getFileData',
                    //     data: {
                    //         fileData: filePath
                    //     }
                    // })
                    fs.readFile({
                        filePath: filePath,
                        type: 'binary',
                        position: 0,
                        success(res) {
                            const xxx = new Uint8Array(res.data);
                            const length = xxx.length;
                            // console.log(xxx.length);
                            console.log(xxx);
                            wx.cloud.callFunction({
                                name: 'getFileData',
                                data: {
                                    fileData: wx.cloud.CDN(JSON.stringify(xxx)),
                                    length
                                },
                                success(res) {
                                    console.log('success');
                                    console.log(res);
                                    // res.result.event.fileData.length = length;
                                    // // console.log(res.result.event.fileData.length);
                                    // console.log(res.result.event.fileData)
                                    // console.log(new Uint8Array(res.result.event.fileData));
                                },
                                fail(res) {
                                    console.log('fail');
                                    console.log(res);
                                }
                            })
                            // wx.cloud.callFunction({
                            //     name: 'getFileData',
                            //     data: {
                            //         fileData: new Uint8Array(res.data)
                            //     },
                            //     success(res) {
                            //         console.log('success');
                            //         console.log(res);
                            //     },
                            //     fail(res) {
                            //         console.log('fail');
                            //         console.log(res);
                            //     }
                            // })
                        },
                        fail(res) {
                            console.error(res)
                        }
                    })
                },
                "photograph": () => {
                    console.log('photograph');
                }
            }
            eventTap[tap]();
            // 选择文件
            // wx.chooseMessageFile({
            //     count: 1,
            //     type: 'file',
            //     success(res) {
            //         // tempFilePath可以作为img标签的src属性显示图片
            //         const tempFilePaths = res.tempFiles;
            //         console.log(tempFilePaths[0].path);
            //         wx.uploadFile({
            //             url: 'https://666c-flickerdata-4ghcwynx39ecd176-1304585141.tcb.qcloud.la/FlickerImg', //仅为示例，非真实的接口地址
            //             filePath: tempFilePaths[0].path,
            //             name: 'file.png',
            //             success(res) {
            //                 // const data = res.data
            //                 //do something
            //                 console.log(res);
            //             },
            //             fail(res) {
            //                 console.log(res);
            //             }
            //         })
            //     }
            // })
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
