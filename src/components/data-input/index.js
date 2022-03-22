/**
 * @file data-input/index.js
 * @desc 数据输入样式组件
 */

import {jumpPage} from '../../common/js/util';

Component({
    /**
    * 组件的属性列表
    */
    properties: {
        itemData: Object
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
            const { url } = this.data.itemData;
            if (url) {
                jumpPage(url);
            }
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
