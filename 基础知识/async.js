// 异步回调是最单解决 从现在到将来 等待的一种方法
const res = ajax(api);
console.log( res );
// 假设只需上述代码 res返回的值肯定是undefined

ajax(api, (data) =>{
    console.log(data);
})
// 我们可以通过回调 拿到值


// E02 事件循环系统 -> 事件循环代码演示
let eventLoop = [],event;
// 循环的每一轮称之为tick
while(true){
    // 如果tick中事件不为空 那么读取一个并执行
    if(eventLoop.length > 0){
        // 这些获取的事件就是回调函数
        // 并且回调函数会一个一个地执行 它会有阻塞
        // 这也从另一个方面说明 setTimeOut设定的时间并不精密
        event = eventLoop.pop();
    }
    try{
        event();
    }catch(e){
        console.log(e,'抛出错误');
    }
}

// E03 并行与异步
var a = 20;
function foo(){
    a = a + 1;
}
function bar(){
    a = a * 2;
}

// 异步编程会根据回调时间的不同 返回不同的结果 -> 41 42都有可能

ajax('url1',foo);
ajax('url2',bar);


// 你不知道的javascript 中卷  P171 
// 两个并发的“进程”通过隐含的顺序相互影响 这个顺序有时会被破坏：
var res = [];
function response(data) {
    res.push( data );
}

// ajax(..)是某个库中提供的某个Ajax函数
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );

// 竞态条件bug之一就是不确定性
// 通过共享作用域中的值进行交互

// 如果解决
// 改造response函数
function response(data) {
    if (data.url == "http://some.url.1") {
        res[0] = data;
        }
        else if (data.url == "http://some.url.2") {
        res[1] = data;
    }
}

// 通过协调保证交互顺序的准确
// 另一种并发交互条件有时被称为竞态
    var a;
    function foo(x) {
        if (!a) {
        a = x * 2;
        baz();
        }
    }
    function bar(x) {
        if (!a) {
            a = x / 2;
            baz();
        }
    }
    function baz() {
        console.log( a );
    }
    // ajax(..)是某个库中的某个Ajax函数
    ajax( "http://some.url.1", foo );
    ajax( "http://some.url.2", bar );

    // 并发协作


    var res = [];
    // response(..)从Ajax调用中取得结果数组
    function response(data) {
        // 添加到已有的res数组
        res = res.concat(
        // 创建一个新的变换数组把所有data值加倍
            data.map( function(val){
                return val * 2;
                })
        );
    }
    // ajax(..)是某个库中提供的某个Ajax函数
    ajax( "http://some.url.1", response );
    ajax( "http://some.url.2", response );

    // 如果ajax返回的数据有很多 一万条甚至一千万条 那么会造成页面的卡顿或者说卡死
    // 可能的解决方法如下:
    var res = [];
    // response(..)从Ajax调用中取得结果数组
    function response(data) {
        // 一次处理1000个
        var chunk = data.splice( 0, 1000 );
        // 添加到已有的res组
        res = res.concat(
            // 创建一个新的数组把chunk中所有值加倍
            chunk.map( function(val){
            return val * 2;
        } )
        );
        // 还有剩下的需要处理吗？
        if (data.length > 0) {
        // 异步调度下一次批处理
        // 使用setTimeout进行异步调度 基本上它的意思就是
        // 把这个函数插入到当前事件循环队列的结尾处
        setTimeout( function(){
            response( data );
        }, 0);
        }
    }
    // ajax(..)是某个库中提供的某个Ajax函数
    ajax( "http://some.url.1", response );
    ajax( "http://some.url.2", response );


    // 任务调度


    console.log( "A" );
    
    // 定时器触发是为了调度下一个事件循环的tick
    setTimeout( function(){
        console.log( "B" );
    }, 0 );
    // 理论上的"任务API"
    schedule( function(){
        console.log( "C" );
        schedule( function(){
            console.log( "D" );
            });
    });


