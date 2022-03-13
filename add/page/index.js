/**
 * @file 页面模板
 * @author hejiangtao
 */

const chalk = require('chalk');
const { add, checkPath } = require('../util.js')

module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'path',
            message: `${chalk.yellow('请输入页面目录')} （示例：src/pages/pagename）`,
            validate: checkPath('name')
        },
        {
            type: 'input',
            name: 'desc',
            message: '请输入组件描述',
            default: '小程序页面'
        }
    ],
    actions: ({path, desc}) => add(path, desc, 'page')
};