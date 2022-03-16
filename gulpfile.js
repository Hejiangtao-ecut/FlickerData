/**
 * @file gulp入口文件
 * @author hejiangtao
 * @desc 自动化入口文件
 */

const { src, watch, dest, series, parallel } = require('gulp');
// 将 gulp 插件引入简洁化
const gulpLoadPlugins = require('gulp-load-plugins');
const g = gulpLoadPlugins();

// 小程序的所有文件放在 src 里面
const root = 'src/';
// 使用 ts 代替 js 开发
const ts = [`${root}**/*.ts`];
// 使用 less 编写样式，最后转译成 wxss
const less = [`${root}**/*.less`];
// 集中不需要处理的文件目录
const copyFile = [
    `${root}**/*.json`,
    `${root}**/*.wxml`,
    `${root}**/*.wxss`,
    `${root}**/*.js`,
    `${root}**/*.png`,
    `${root}**/*.svg`,
    `${root}**/*.jpg`,
    `${root}**/*.gif`,
];

// 处理一些无需编译的文件
function copyOtherFile() {
    return src(copyFile)
        .pipe(g.cached('copyFile'))
        .pipe(dest('dist/'));
}

// less 转 css 生成 wxss
function transformLess() {
    return src(less)
        .pipe(g.less())
        .pipe(g.rename({
            extname: '.wxss'
        }))
        .pipe(dest('dist/'));
}

function ts2js() {
    return src(ts)
        .pipe(g.cached('tsFile'))
        .pipe(g.typescript({
            target: 'es5'
        }))
        .pipe(dest('dist/'));
}

exports.build = async () => {
    const wathOpts = {
        ignoreInitial: false
    };

    watch(ts, wathOpts, ts2js);
    watch(less, wathOpts, transformLess);
    watch(copyFile, wathOpts, copyOtherFile);
}