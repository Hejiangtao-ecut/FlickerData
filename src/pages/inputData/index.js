/**
 * @file inputData/index.js
 * @desc 小程序页面
 */

const DB = wx.cloud.database().collection("tplData");
import { saveImageToPhotos, initChart } from '../../common/js/canvas';
import { showToast, getCloudData } from '../../common/js/util';
import { PAGEINFO, TPLDATA } from '../../common/js/type';

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
        hasChart: false
    },

    /**
    * 生命周期函数--监听页面加载
    */
    async onLoad(option) {
        console.log(option);
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
            // this.chart.setOption(tplData.data[0].tplData);
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
            option.dataset.source = data.data.dataTask;
            if (data.data.title) {
                option.title.text = data.data.title;
            };
            const length = data.data.dataTask[0].length;
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
            console.log(newData);
            this.chart.setOption(newData);
            this.setData({
                data: JSON.stringify(newData, null, 2)
            });
        } catch (error) {
        }
        return e.detail.value;
    },

    /**
     * 提交数据
     */
    submit() {
        if (!(this.data.id && this.data.data)) {
            showToast('请输入数据！', 'error');
            return;
        }
        const THIS = this;
        DB.where({
            tplDataId: this.data.id
        })
            .get({
                success: function (res) {
                    console.log(res);
                    res.data[0] ? THIS.update(res.data[0]._id) : THIS.add();
                },
                fail(e) {
                    console.log('fail---');
                    console.log(e);
                }
            })
    },

    /**
     * 更新数据
     */
    update(id) {
        const x = JSON.parse(this.data.data);
        const THIS = this;
        DB.doc(id).update({
            data: {
                tplData: x
            },
            success(res) {
                console.log(res);
                res.stats.updated ? showToast("更新数据成功", 'success') : showToast("更新数据失败", 'error');
                THIS.setData({
                    data: '',
                    id: 'dataset'
                });
            }
        });
    },
    add() {
        const x = JSON.parse(this.data.data);
        const THIS = this;
        DB.add({
            data: {
                tplDataId: this.data.id,
                tplData: x
            },
            success(res) {
                console.log(res)
                showToast("添加数据成功", 'success');
                THIS.setData({
                    data: '',
                    id: ''
                });
            }
        });
    }
})