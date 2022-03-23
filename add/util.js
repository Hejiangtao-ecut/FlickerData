/**
 * @file util
 * @desc 通用函数库
 */

const chalk = require('chalk');

/**
 * 获取页面名称
 *
 * @param {string} path 输入的目录
 * @return {string} 页面名称
 */
const getName = path => path.split('/').pop();

/**
 * 获取页面中引入文件的相对路径
 * @param {string} path 输入的目录
 * @return {string} 相对路径
 */
const baseRelativePath = path => path.split('/').map(() => '../')
.join('')
.slice(1);

/**
 * 校验目录正确性
 *
 * @return {boolean} 终止函数
 */
const checkComponentPath = () => path => {
    if (path.indexOf('src/components') !== 0) {
        return chalk.red('请按照示例输入正确的目录');
    }
    if (!getName(path)) {
        return chalk.red('目录中必须包含组件名称，请参考示例正确输入');
    }
    return true;
};

/**
 * 校验目录正确性
 *
 * @return {boolean}终止函数
 */
const checkPath = () => path => {
    if (path.indexOf('src/') !== 0) {
        return chalk.red('请按照示例输入正确的目录');
    }
    if (!getName(path)) {
        return chalk.red('目录中必须包含页面名称，请参考示例正确输入');
    }
    return true;
};

/**
 * 增加页面或者组件
 */
function add(path, desc, type) {
    const actions = [];
    const pageMap = new Map([
        ['js', 'js.hbs'],
        ['less', 'less.hbs'],
        ['json', 'json.hbs'],
        ['wxml', 'wxml.hbs']
    ]);

    pageMap.forEach((file, fileName) => {
        actions.push({
            type: 'add',
            path: `${path}/index.${fileName}`,
            templateFile: `add/${type}/template/${file}`,
            data: {
                name: getName(path),
                desc,
                rendered: '{{rendered}}',
                err: '{{{type: errType}}}',
                showErrorPage: '{{[]}}',
                baseRelativePath: baseRelativePath(path)
            }
        });
    });
    return actions;
}

/**
 * 校验云函数的正确性
 */
const checkCloudFunctionPath = () => path => {
    if (path.indexOf('src/cloudfunctions') !== 0) {
        return chalk.red('请按照示例输入正确的目录');
    }
    if (!getName(path)) {
        return chalk.red('目录中必须包含云函数名称，请参考示例正确输入');
    }
    return true;
}

/**
 * 增加云函数
 */
function addCloudFunction(path, desc, type) {
    const actions = [];
    const pageMap = new Map([
        ['js', 'js.hbs'],
        ['config', 'config.hbs'],
        ['json', 'json.hbs']
    ]);

    pageMap.forEach((file, fileName) => {
        let pathName = '';
        switch (fileName) {
            case 'js':
                pathName = `${path}/index.${fileName}`;
                break;
            case 'json':
                pathName = `${path}/package.${fileName}`;
                break;
            case 'config':
                pathName = `${path}/config.json`;
                break;
            default:
                break;
        };
        actions.push({
            type: 'add',
            path: pathName,
            templateFile: `add/${type}/template/${file}`,
            data: {
                name: getName(path),
                desc,
                rendered: '{{rendered}}',
                err: '{{{type: errType}}}',
                showErrorPage: '{{[]}}',
                baseRelativePath: baseRelativePath(path)
            }
        });
    });
    return actions;
}

module.exports = {
    add,
    checkComponentPath,
    checkPath,
    addCloudFunction,
    checkCloudFunctionPath
}