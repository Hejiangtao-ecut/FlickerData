/**
 * @file data-input/index.js
 * @desc 数据输入样式组件
 */

import { jumpPage, selectFile } from '../../common/js/util';
const XSLS = require('./xlsl-core');

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
                    fs.readFile({
                        filePath: filePath,
                        encoding: 'utf8',
                        position: 0,
                        success(res) {
                            console.log(res);
                            const data = XSLS.read(res, {type:'utf8'});
                            console.log(data);
                        },
                        fail(res) {
                            console.error(res)
                        }
                    })
                },
                "photograph": () => {
                    console.log('photograph');
                    console.log(XSLS);
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
