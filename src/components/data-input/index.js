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
                    showLoading('数据提取中...');
                    const fs = wx.getFileSystemManager();
                    fs.readFile({
                        filePath: path,
                        encoding: 'base64',
                        success: (res) => {
                            const fileData = res.data;
                            this.getToken(fileData);
                        },
                        fail: () => {
                            wx.hideLoading();
                            showToast('数据提取失败', ' fail');
                        }
                    })
                }
            }
            eventTap[tap]();
        },

        /**
         * @doc 获取处理图片的认证
         */
        getToken(fileData) {
            wx.request({
                url: TOKEN,
                success: (res) => {
                    // 获取到 token
                    const { access_token } = res.data;
                    this.getImgData(access_token, fileData);
                },
                fail: () => {
                    wx.hideLoading();
                    showToast('数据提取失败', ' fail');
                }
            })
        },

        /**
         * @doc 获取图片数据
         */
        getImgData(access_token, fileData) {
            wx.request({
                url: `${FORMDATA}${access_token}&`,
                method: 'POST',
                header: {
                    "content-type": 'application/x-www-form-urlencoded'
                },
                data: {
                    image: fileData
                },
                success: (res) => {
                    const { body } = res.data.forms_result[0];
                    this.analysis(body);
                },
                fail: () => {
                    wx.hideLoading();
                    showToast('数据提取失败', ' fail');
                }
            });
        },

        /**
         * @doc 分析图片读取数据
         */
        analysis(bodyData) {
            // 用来提取数据
            const extract = [];

            bodyData.forEach(item => {
                const { column, row, words } = item;
                // 对应行不存在数组的时候创建一个
                if (!extract[row]) {
                    extract[row] = [];
                }
                extract[row][column] = words;
            });

            // 存放最终有效数据
            const realData = [];
            // 过滤无效空数据，最后提取出真正的二维表格数据
            extract.forEach((item) => {
                const arr = item.filter(v => v);
                arr.length ? realData.push(arr) : '';
            });
            const finalData = {
                title: '',
                dataTask:realData
            }
            if (realData[0].length === 1) {
                finalData.title = realData[0][0];
                realData.shift();
            }
            wx.hideLoading();
            this.jumpWithData(finalData);
        },

        /**
         * 携带数据跳转
         */
        jumpWithData(fileData) {
            wx.navigateTo({
                url: this.data.itemData.url,
                success: function (res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('acceptDataFromOpenerPage', fileData)
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
