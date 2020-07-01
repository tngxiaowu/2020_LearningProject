// next.js整体框架配置文件
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css'] = file => {}
}

// 输出的修改文件配置
module.exports = withCss({})                            