/**
 * @file show-model/index.js
 * @desc 展示模块
 */

Component({
    /**
    * 组件的属性列表
    */
    properties: {
        index: Number,
        itemData: Object,
        isShow: {
            type: Boolean,
            value: false,
            observer: function (isShow) {
                console.log('----');
                console.log(isShow);
                console.log(this.data.isShow);
            }
        }
    },

    /**
    * 组件的初始数据
    */
    data: {

    },

    /**
     * 数据监听
     */
    // observers: {
    //     'isShow': function (isShow) {
    //         console.log('----');
    //         console.log(isShow);
    //         console.log(this.data.isShow);
    //     }
    // },

    /**
    * 组件的方法列表
    */
    methods: {

    }
})
