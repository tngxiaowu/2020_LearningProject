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


// P165 
// 三个函数嵌套在一起
// 函数1
listen( "click", function handler(evt){
    // 函数2
    setTimeout( function request(){
    // 函数3
        ajax( "http://some.url.1", function response(text){
            if (text == "hello") {
            handler();
            }
            else if (text == "world") {
            request();
            }
            } );
    }, 500) ;
});

// 异步代码程序中总是会有很多噪声 这些噪声使得我们无法集中精力去追踪代码流
doA(function(){
    doB();
    doC( function(){
        doD(); 
    });
    doE();
})
doF();
// 难以追踪代码的执行顺序


// 问题是嵌套造成了这样的原因么

listen('click',handler);

function handler(){
    setTimeout(  request,3000);
}

function request(){
    ajax('http://some.url.1',response);
}

function response(text){
    if(text === 'hello'){
        handler();
    }else if(text === 'world'){
        request();
    }
}

// 使用手工硬编码的方式 看似是解决了 代码组织的凌乱 
// 但是回调依旧充满了脆弱
// 比如 异常处理如何处理?
// 即使你指定了所有的事件和可能性 那么你的代码还是依旧会变得很糟糕


// 为了解决信任问题 我需要写很多代码
function asyncify(fn) {
    var orig_fn = fn, 
    intv = setTimeout( function(){
        intv = null;
        if (fn) fn();
    }, 0 );
    
    fn = null;
    
    return function() {
    // 触发太快，在定时器intv触发指示异步转换发生之前？
        if (intv) {
            fn = orig_fn.bind.apply(
            orig_fn,
            // 把封装器的this添加到bind(..)调用的参数中，
            // 以及克里化（currying）所有传入参数
            [this].concat( [].slice.call( arguments ) )
            );
        }// 已经是异步
        else {
            // 调用原来的函数
            orig_fn.apply( this, arguments );
            }
    };
}

// Promise
var x , y = 5;
console.log( x + y ); // NAN
// 我们知道上述这段代码肯定会输出NAN 因为x的值没有确定

// 如果通过fetch包裹的是 一个异步表达式 
// 我们怎么确定 在 得到x 以及 得到y后 才进行相加操作呢
console.log( fectch(x) + fetch(y) );
// 初次之外 怎么表达依赖关系(y的值需要x值获得之后?)
// 一种基于回调解决的方案为: 
function add(getX,getY,cb) {
    var x, y;
    getX(function(xVal){
        x = xVal;
        // 两个都准备好了？
        if (y != undefined) {
        cb( x + y ); // 发送和
        }
    } );
    getY( function(yVal){
        y = yVal;
        // 两个都准备好了？
        if (x != undefined) {
        cb( x + y ); // 发送和
        }
    } );
    }
    // fetchX() 和fetchY()是同步或者异步函数
    add( fetchX, fetchY, function(sum){
        console.log( sum ); // 是不是很容易？
    } );

    // 这个函数将未来和现在归一化了 所以确保了add运算的输出时可以预测的
    // 也就是说 从现在到未来的时间 他们的行为都是一致的
    // 说的直白点 就是为了统一现在和未来 我们都将它处理为了未来

    // 对比回调函数 是不是更简单以及清楚？
    function addByPromise(x,y){
        return Promisea.all([fetch(X),fetch(y)]).then( values  =>{
            return values[0] + values[1];
        })
    }


    const d = [ 
        { name:'老李',sex:'01' } ,
        { name:'老王',sex:'00' }, 
        { name:'老哥',sex:'01' }   ]

    

    function getPrecent(arr){
        // 获取数组长度
        const l = arr.length;
        // 标志位 统计男生条数
        const m = 0;
        // 遍历数组
        d.forEach( item =>{
        // 是男生 m+1
            if(item === '01'){
                m++
            };
        })
        // 最后 男性/总量
        return m/l
    }


    // P184
    function Foo(){
        console.log('It is demo');
    }

    Foo(); // 这个函数可能立即完成任务 也有可能需要一段时间

    // 需要某种方法 在foo完成的时候得到通知 以便可以继续下一步
    
    // 类似于 观察者模式 
    // 一旦发生变化 就会通知
    window.addEventListener('notify', () =>{

    })

    // 或者js需要自己创建一个事件订阅对象

    function createListeners(fn){
        // 开始做点可能消耗时间的操作
        fn();

        // 返回一个Listern事件对象
        return listeners;
    }

    const evt =  createListeners();

    evt.on('success',()=>{
        console.log('It Success');
    });

    evt.on('fail',()=>{
        console.log('Sorry, the process failed');
    });

    // evt就是分离的关注点之间一个中立的第三方协商机制
    // 所以 上述就是对Promise的一个模拟

    const p = new Promise( () =>{
        console.log(this);
    }) // 返回了一个promise对象


    const e = new Promise( function( resolve,reject ){ setTimeout( function(){
        console.log('hello world');
        // 通过resolve去传递至 类似于通知其他人
        resolve(1);
    },3000 ) } )

    // 一旦异步完成之后resolve数据 就会调用then函数 
    e.then( res =>{ console.log(res,'what is res')});



    const q = new Promise( function( resolve,reject ){

        resolve(1);
    } )

    q.then( function(){
        console.log('A')
        q.then( function(){
            setTimeout( function(){
                console.log('C');
            },0)
            
        } )
    } )
    q.then( function(){
        setTimeout( function(){
            console.log('B');
        },0)
    } )


    // 独立的promise之间的调用顺序是不确定的
    var p3 = new Promise( function(resolve,reject){
        resolve( "B" );
    } );
    
    var p1 = new Promise( function(resolve,reject){
        resolve( p3 );
    } );
    
    p2 = new Promise( function(resolve,reject){
        resolve( "A" );
    } );
    // p1的回调放在p2回调之后
    p1.then( function(v){
        console.log( v );
    });

    p2.then( function(v){
        console.log( v );
    });
    // A B <-- 而不是像你可能认为的B A







