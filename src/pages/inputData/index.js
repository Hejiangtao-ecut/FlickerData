/**
 * @file inputData/index.js
 * @desc 小程序页面
 */

const DB = wx.cloud.database().collection("tplData");
import { showToast } from '../../common/js/util';

Page({

    /**
    * 页面的初始数据
    */
    data: {
        id: '',
        data: ''

    },

    /**
     * 获取 id
     */
    getId(e) {
        this.setData({
            id: e.detail.value
        });
        return e.detail.value;
    },

    /**
     * 获取 data
     */
    getData(e) {
        this.setData({
            data: e.detail.value
        });
        return e.detail.value;
    },

    /**
     * 提交数据
     */
    submit() {
        // if (!(this.data.id && this.data.data)) {
        //     showToast('缺少 id 或者 data', 'error');
        //     return;
        // }
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
        DB.doc(id).update({
            data: {
                tplData: x
            },
            success(res) {
                console.log(res);
                res.stats.updated ? showToast("更新数据成功", 'success') : showToast("更新数据失败", 'error');
            }
        });
    },
    add() {
        const x = JSON.parse(this.data.data);
        DB.add({
            data: {
                tplDataId: this.data.id,
                tplData: x
            },
            success(res) {
                console.log(res)
                showToast("添加数据成功", 'success');
            }
        });
    }
})