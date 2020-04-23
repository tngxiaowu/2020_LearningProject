let co = require('co');
let convert = require('koa-convert');

module.exports = {
    // 中间件以数组形式保存
    middleware:[],
    // 通过push形式添加到数组 并且返回this -> 支持链式调用
    use: function(fn){
        this.middleware.push(fn);
        return this;
    },
    callback:function(cb){
        // 通过compose把中间件转换为一个名为fn的generator函数
        const fn = convert.compose(this.middleware);
        // 通过co模块执行fn
        // 返回一个promise 成功的话 执行cb函数
        var ctx = {};
        fn(ctx).then(function(){

        })
    },
}
