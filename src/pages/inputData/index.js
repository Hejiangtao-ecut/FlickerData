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
    },

    /**
    * 生命周期函数--监听页面加载
    */
    async onLoad() {
        const tplData = await getCloudData(PAGEINFO, {
            type: TPLDATA,
            tplDataId: 'lineChart0'
        });
        if (tplData?.data?.[0]) {
            console.log('=======');
            // this.chart.setOption(tplData.data[0].tplData);
            this.setData({
                data: tplData.data[0].tplData,
                tipData: JSON.stringify(tplData.data[0].tplData)
            })
        } else {
            showToast('网络异常', 'error');
        }
        const eventChannel = this.getOpenerEventChannel();
        const THIS = this;
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            const option = {
                legend: {},
                tooltip: {},
                dataset: {
                    // 提供一份数据。
                    source: [
                        ['product', '2015', '2016', '2017'],
                        ['Matcha Latte', 43.3, 85.8, 93.7],
                        ['Milk Tea', 83.1, 73.4, 55.1],
                        ['Cheese Cocoa', 86.4, 65.2, 82.5],
                        ['Walnut Brownie', 72.4, 53.9, 39.1]
                    ]
                },
                // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
                xAxis: { type: 'category' },
                // 声明一个 Y 轴，数值轴。
                yAxis: {},
                // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
                series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
            };
            console.log('getData')
            console.log(data)
            // console.log(THIS.data.data);
            option.dataset.source = data.data.dataTask;
            console.log(option);
            THIS.chart.setOption(option);
            THIS.setData({
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
        }
    },

    /**
     * 获取 data
     */
    getData(e) {
        let newData = '';
        try {
            newData = JSON.parse(e.detail.value);
        } catch (error) {
            showToast('json数据异常', 'error');
            return e.detail.value;
        }
        this.chart.setOption(newData);
        this.setData({
            data: JSON.stringify(newData, null, 2)
        });
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