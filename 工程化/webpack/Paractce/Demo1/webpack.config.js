const path = require('path');


module.exports = {
    entry:{

    },
    output:{
        filename:'[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    module:{
        rules:[
            // 使用babel-loader对js进行编译
            {
                test: /\.js$/,
                use:['babel-loader'],
                exclude: path.resolve(__dirname,'node_module') 

            },
            // 将css代码压缩 并且抽离
            {
                test:/.\css$/,
                use: ExtractTextPlugin().extract({

                })

            }
           
            
        ]

    },
    plugins:[],



}