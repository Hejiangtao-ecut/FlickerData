/**
 * @file tplInfo/index.js
 * @desc 模板预览页面
 */

import { saveImageToPhotos, initChart, authSaveImage } from '../../common/js/canvas';
import { getCloudData, setClipboardData, showLoading, showToast } from '../../common/js/util';
import { PAGEINFO, TPLDATA, BASICINFO, INPUTDATA, GETDATA } from '../../common/js/type';

const App = getApp();

Page({
    data: {
        ec: {
            onInit: initChart
        },
        hasChart:false,
        clicked: false,
        data: ''
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad(options) {
        const { Id, type } = options;
        this.setData({
            Id,
            type
        });
        type === 'official' ? this.official() : this.personal();

        getCloudData(PAGEINFO, {
            type: BASICINFO,
            pageName: INPUTDATA
        }).then(res => {
            let x = res.data[0].imgList.pop();
            res.data[0].imgList.pop();
            res.data[0].imgList.push(x);
            this.setData({
                imgList: res.data[0].imgList || []
            });
        })
    },

    /**
     * 内置数据
     */
    async official() {
        const tplData = await getCloudData(PAGEINFO, {
            type: TPLDATA,
            tplDataId: this.data.Id
        });
        if (tplData?.data?.[0]) {
            const relData = tplData.data[0].tplData;
            this.setData({
                data: JSON.stringify(relData, null, 2),
                Id: tplData.data[0]._id
            })
            this.setOption(tplData.data[0].tplData);
        }
    },

    /**
     * 用户个人数据
     */
    async personal() {
        const data = await getCloudData(PAGEINFO, {
            type: GETDATA,
            Id: this.data.Id
        });
        if (data.data) {
            const relData = data.data.tplData;
            this.setData({
                data: relData
            })
            this.setOption(JSON.parse(relData));
        }
    },

    /**
     * @doc 获取 chart 实例
     * @param {*} e.detail chart 实例
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
     *  初次注入数据，有时候数据比实例先拿到，兼容一下等拿到实例再初始化
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
     * 事件中心
     */
    switchFunc(e) {
        const { index } = e.currentTarget.dataset;
        const funcList = ['setClip', 'saveImg', 'shareData'];
        const funcCenter = {
            'setClip': () => {
                setClipboardData(this.data.data);
            },
            'saveImg': () => {
                const chartDom = this.selectComponent('#mychart-dom-bar');
                App.globalData.isWritePhotosAlbum ? saveImageToPhotos(chartDom) : authSaveImage(chartDom);
            },
            'shareData': () => {
                this.onShareAppMessage();
            }
        }
        funcCenter[funcList[index]]();
    },

    /**
     * 分享事件
     */
    onShareAppMessage() {
        return {
            path: `/pages/tplInfo/index?type=personal&Id=${this.data.Id}`
        }
    }
});