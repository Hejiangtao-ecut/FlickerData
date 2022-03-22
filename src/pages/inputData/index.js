/**
 * @file inputData/index.js
 * @desc 小程序页面
 */

const DB = wx.cloud.database().collection("tplData");
import { saveImageToPhotos, initChart } from '../../common/js/canvas';
import { showToast, getCloudData } from '../../common/js/util';
import {PAGEINFO, TPLDATA} from '../../common/js/type';

Page({

    /**
    * 页面的初始数据
    */
    data: {
        data: '',
        tipData:'',
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
            this.chart.setOption(tplData.data[0].tplData);
            this.setData({
                tipData: JSON.stringify(tplData.data[0].tplData)
            })
        } else {
            showToast('网络异常','error');
        }
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
            data: newData
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
                    // res.data[0] ? THIS.update(res.data[0]._id) : THIS.add();
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