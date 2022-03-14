/**
 * @file data-input/index.js
 * @desc 数据输入样式组件
 */

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
            console.log(this.properties.itemData);
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
