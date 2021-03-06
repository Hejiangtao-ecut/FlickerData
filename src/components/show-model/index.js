/**
 * @file show-model/index.js
 * @desc 展示模块
 */

import { getCloudData, jumpPage } from '../../common/js/util';
import {PAGEINFO, TPLINFO} from '../../common/js/type';

Component({
    /**
    * 组件的属性列表
    */
    properties: {
        tplNum: Number,
        isShow: {
            type: Boolean,
            value: false,
            observer: async function (isShow) {
                if (this.data.isGetData) {
                    return;
                }
                const listData = await getCloudData(PAGEINFO, {
                    type: TPLINFO,
                    tplNum: this.data.tplNum
                });
                if (listData?.data?.[0]) {
                    this.setData({
                        isGetData: true,
                        tplList: listData.data[0].tplList
                    })
                }
            }
        }
    },

    /**
    * 组件的初始数据
    */
    data: {
        // 是否成功获取过数据
        isGetData: false,
        // 模板列表信息
        tplList: []
    },

    /**
    * 组件的方法列表
    */
    methods: {
        jumpTplInfo(e) {
            const { index } = e.currentTarget.dataset;
            const { tplInfoId } = this.data.tplList[index];
            wx.vibrateShort({
                type: 'light'
            });
            jumpPage(`/pages/tplInfo/index?Id=${tplInfoId}&type=official`);
        }
    }
})
