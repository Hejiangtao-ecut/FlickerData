/**
 * @file classify/index.js
 * @desc 分类页面
 */

import { getPageInfo } from '../../common/js/util';


Page({

    /**
    * 页面的初始数据
    */
    data: {
        list: new Array(10).fill(1),
        selected: 0
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: async function (options) {
        const data = await getPageInfo('classifyi');
        console.log(data);
        // const { pageInfo } = data;
        // console.log(pageInfo);
    },

    clicked(e) {
        console.log(e);
        this.setData({
            selected: e.target.dataset.index
        })
    }
})