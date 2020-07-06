// next.js整体框架配置文件
const withCss = require('@zeit/next-css')

const config = {
    // 编译文件的输出目录(默认.next)
    distDir:'dest',
    // 给每个路由生成ETag
    generateEtags: true,
    // 页面缓存设置
    onDemandEntries:{
        maxInactobeAge: 25  * 1000, // 缓存多少时间
        pagesBufferLength: 2, // 同时缓存多少页面
    },
    pageExtensions:['js','jsx'], // js下面那些后缀结尾会被认为是文件
    generateBuildId: async ()=> {
        return null
    }, // 返回BuildId
    webpack(config){
        // 可以参考zeit/next-css下面的index.js
        return config
    },// 修改nextJS webpack配置
    webpackDevMiddleware(){

    },
    // 添加全局变量 process.env.name
    env:{
        name:'laowang'
    },
    // 下面两个需要通过next/config来读取
    // 客户端渲染时 是拿不到这些内容的
    serverRuntimeConfig:{

    },

    publicRuntimeConfig:{

    }
}

if(typeof require !== 'undefined'){
    require.extensions['.css'] = file => {}
}

// 输出的修改文件配置
module.exports = withCss({})                            