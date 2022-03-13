/**
 * @file 云函数模板
 * @author hejiangtao
 */

const chalk = require('chalk');
const { addCloudFunction, checkCloudFunctionPath } = require('../util.js')

module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'path',
            message: `${chalk.yellow('请输入云函数目录')} （示例：src/cloudfunctions/cloudfunctions-name）`,
            validate: checkCloudFunctionPath('name')
        },
        {
            type: 'input',
            name: 'desc',
            message: '请输入云函数描述',
            default: '云函数'
        }
    ],
    actions: ({path, desc}) => addCloudFunction(path, desc, 'cloudfunctions')
};