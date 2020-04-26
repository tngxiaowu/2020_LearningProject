// 无模块化时代
// 业务代码也就20 - 30行 模块化个锤子 


// 前模块化 -> 模块化萌芽

// 解决方案: 对象模式
let module = {
    fn1:function(){
        console.log('I am fn1');
    },
    fn2:function(){
        console.log('I am fn2');
    }
}

module.fn1();
module.fn2();

// IIFE模式
{
    const module = ( function(){
        // 这个变量被保存到对象中了
        var foo = 'bar';
        var fn1 = function(){

        }
        var fn2 = function(){

        }

        return {
            fn1,
            fn2,
        }
    })()
}

// 结合顶层的window
// 这样的实现 数据data完全做到了私有 外界无法修改
// 只能通过暴露的接口去更改
( function(window){
    var data = 'data';

    function foo(){
        console.log('Hello, I am Foo');
    }

    function bar(){
        console.log('Hello I am Bar');
    }

    window.module = { foo,bar};
})(window)

// 如果依赖 已经初步具有模块化的实质~

// 如果modlue1依赖外部其他模块 怎么办
( function(window,$){
    var data = 'data';

    function foo(){
        console.log('Hello, I am Foo',$);
    }

    function bar(){
        console.log('Hello I am Bar',$);
    }

    window.module = { foo,bar};
})(window,jQuery)





