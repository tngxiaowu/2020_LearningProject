let co = require('co');
let compose = require('koa-compose');

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
        const fn = compose(this.middleware);
        // 通过co模块执行fn
        // 返回一个promise 成功的话 执行cb函数
        var ctx = {};
        fn(ctx).then(function(){

        })
    },

    compose:function(middleware){
        return function(context,next){
            let index = -1;
            return dispatch(0);

            function dispatch(i){
                if(i < index) return Promise.reject( new Error(`Can Not be`));
                index = i;
                const fn = middleware[i] || next
                if(!fn) return Promise.resolve()

                try{
                    return Promise.resolve(fn(context,function next(){
                        return dispatch(i+1);
                    }))
                }catch(err){
                    return Promise.reject(err);
                }
            }
        }
    }
}
