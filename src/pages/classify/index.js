/**
 * @file classify/index.js
 * @desc 分类页面
 */

Page({

    /**
    * 页面的初始数据
    */
    data: {
        list: new Array(10).fill(1),
        selected: 0
    },

    clicked(e) {
        console.log(e);
        this.setData({
            selected: e.target.dataset.index
        })
    }
})