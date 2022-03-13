/**
 * plop 文件入口
 */

const chalk = require('chalk');

const page = require('./add/page');
const component = require('./add/component');
const cloudfunctions = require('./add/cloudfunctions');

module.exports = function (plop) {

    plop.setWelcomeMessage(chalk.yellow('请选择要创建的模板类型'));

    plop.setGenerator('page', page);

    plop.setGenerator('component', component);

    plop.setGenerator('cloudfunctions', cloudfunctions);
};