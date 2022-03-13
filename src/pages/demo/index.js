/**
 * @file demo/index.js
 * @desc 云开发 demo 页面
 */

// 初始化数据库  wx.cloud.database()
// 获取数据表  collection

const DB = wx.cloud.database().collection("produce");

Page({

    /**
    * 页面的初始数据
    */
    data: {
        name: '',
        age: 0,
        delName: ''
    },

    /**
     * 获取输入名字的信息
     */
    getName(event) {
        this.setData({
            name:event.detail.value
        });
        console.log(this.data.name);
    },

    /**
     * 获取输入年龄的信息
     */
    getAge(event) {
        this.setData({
            age:event.detail.value
        });
        console.log(this.data.age);
    },

    /**
     * 调用云函数
     */
    buttonTap() {
        wx.cloud.callFunction({
            name: "test",
            data: {
                a: 2,
                b: 3
            },
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        })
    },

    /**
     * 向数据库添加数据
     */
    addData() {
        const { name, age } = this.data;
        DB.add({
            data: {
                name,
                age
            },
            success(res) {
                console.log('添加成功');
                console.log(res);
            },
            fail(res) {
                console.log('添加失败');
                console.log(res);
            }
        })
    },

    /**
     * 查询数据
     */
    getData() {
        DB.get({
            success(res) {
                console.log('查询成功');
                console.log(res);
            },
            fail(res) {
                console.log('查询失败');
                console.log(res);
            }
        })
    },

    /**
     * 获取要删除的名字
     */
    getDelName(event) {
        this.setData({
            delName:event.detail.value
        });
        console.log(this.data.delName);
    },

    /**
     * 获取要删除的 id
     */
    async getDelId() {
        let delId = '';
        await DB
            .where({
                name: this.data.delName
            })
            .get()
            .then(res => {
                console.log(res);
                delId = res.data[0] && res.data[0]._id;
            });
        return delId;
    },

    /**
     * 删除数据
     * 删除数据最好是获取到唯一值，不然会误删多条数据
     * 所以删除数据前最好使用获需要删除的 id
     */
    async delData() {
        const delId = await this.getDelId();
        console.log('----');
        if (delId) {
            DB.doc(delId).remove({
                success(res) {
                    console.log('删除成功');
                    console.log(res);
                },
                fail(res) {
                    console.log('删除失败');
                    console.log(res);
                }
            });
        }
    },

    /**
     * 更新数据
     */
    async upDate () {
        const upId = await this.getDelId();
        if (upId) {
            DB.doc(upId).update({
                data: {
                    name: this.data.name,
                    age: this.data.age
                },
                success(res) {
                    console.log('success');
                    console.log(res);
                }
            });
        }
    }
})