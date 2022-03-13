/**
 * @file 组件模板
 * @author hejiangtao
 */

const chalk = require('chalk');
const { add, checkComponentPath } = require('../util.js')

module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'path',
            message: `${chalk.yellow('请输入组件目录')} （示例：src/components/component-name）`,
            validate: checkComponentPath('name')
        },
        {
            type: 'input',
            name: 'desc',
            message: '请输入组件描述',
            default: '小程序组件'
        }
    ],
    actions: ({path, desc}) => add(path, desc, 'component')
};