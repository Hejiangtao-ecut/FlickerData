/**
 * @file inputData/index.js
 * @desc 小程序页面
 */

import {
    saveImageToPhotos, initChart,
    authSaveImage, saveUserEcImg
} from '../../common/js/canvas';
import {
    showToast, getCloudData,
    setClipboardData, showLoading
} from '../../common/js/util';
import {
    ADDUSERECDATA, BASICINFO,
    INPUTDATA, PAGEINFO,
    TPLDATA, USERINFO, ADDDATALIST
} from '../../common/js/type';

const App = getApp();

Page({

    /**
    * 页面的初始数据
    */
    data: {
        data: '',
        tipData: '',
        ec: {
            onInit: initChart
        },
        hasChart: false,
        imgList:[]
    },

    /**
    * 生命周期函数--监听页面加载
    */
    async onLoad(option) {
        getCloudData(PAGEINFO, {
            type: BASICINFO,
            pageName: INPUTDATA
        }).then(res => {
            this.setData({
                imgList: res.data[0].imgList || []
            })
        })

        const { type } = option;
        const eventCenter = {
            "input": () => {
                this.getTipData();
            },
            "fileInput": () => {
                this.getChannelData();
            },
            "imgInput": () => {
                this.getChannelData();
            }
        }
        eventCenter[type]();
    },

    /**
     * @doc 手动输入模式，提供一个默认的案例进行提示
     */
    async getTipData() {
        const tplData = await getCloudData(PAGEINFO, {
            type: TPLDATA,
            tplDataId: 'lineChart0'
        });
        if (tplData?.data?.[0]) {
            this.setOption(tplData.data[0].tplData);
            this.setData({
                tipData: JSON.stringify(tplData.data[0].tplData)
            })
        } else {
            showToast('网络异常', 'error');
        }
    },

    /**
     * 将数组转换成 echart 初始化数据
     */
    getChannelData() {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('acceptDataFromOpenerPage', (data) => {
            const option = {
                title: {
                    text: ''
                },
                legend: {},
                tooltip: {},
                dataset: {
                    sourceHeader: true
                },
                xAxis: { type: 'category' },
                yAxis: {},
                series: []
            };
            option.dataset.source = data.dataTask;
            if (data.title) {
                option.title.text = data.title;
            };
            const length = data.dataTask[0].length;
            // 默认设置每一项属性值为柱状图
            option.series = new Array(length).fill({ type: 'bar' });
            option.series.pop();
            this.setOption(option);
            this.setData({
                data: JSON.stringify(option, null, 2)
            })
        })
    },

    /**
     * @doc 获取 chart 实例
     * @param e.detail chart 实例
     */
    getChart(e) {
        // 获取 chart，进行数据操纵
        if (e.detail) {
            this.chart = e.detail;
            this.setData({
                hasChart: true
            })
        }
    },

    /**
     * @doc 初次注入数据，有时候数据比实例先拿到，兼容一下等拿到实例再初始化
     */
    setOption(data) {
        if (this.data.hasChart) {
            this.chart.setOption(data);
            if (this.intval) {
                clearInterval(this.intval);
            }
        } else if(!this.intval) {
            this.intval = setInterval(() => {
                this.setOption(data);
            }, 100);
        }
    },

    /**
     * 获取 data
     */
    getData(e) {
        let newData = '';
        try {
            newData = JSON.parse(e.detail.value);
            this.chart.setOption(newData);
            this.setData({
                data: JSON.stringify(newData, null, 2)
            });
        } catch (error) {
        }
        return e.detail.value;
    },

    /**
     * 事件中心
     */
    switchFunc(e) {
        const { index } = e.currentTarget.dataset;
        const funcList = ['setClip', 'saveImg', 'upCloud'];
        const funcCenter = {
            'setClip': () => {
                setClipboardData(this.data.data);
            },
            'saveImg': () => {
                const chartDom = this.selectComponent('#mychart-dom-bar');
                App.globalData.isWritePhotosAlbum ? saveImageToPhotos(chartDom) : authSaveImage(chartDom);
            },
            'upCloud': async () => {
                showLoading('数据上传中....');
                const upData = getCloudData(USERINFO, {
                    type: ADDUSERECDATA,
                    tplData: this.data.data
                });
                const filePath = saveUserEcImg(this.selectComponent('#mychart-dom-bar'));
                Promise.all([upData, filePath])
                    .then(([dataId, imgId]) => {
                        getCloudData(USERINFO, {
                            type: ADDDATALIST,
                            dataItem: {
                                id: dataId._id,
                                imgUrl: imgId.fileID
                            }
                        });
                        wx.hideLoading();
                        showToast('数据添加成功!', 'success');
                    }).finally(() => {
                        wx.hideLoading();
                    });
            }
        }
        funcCenter[funcList[index]]();
    }
})