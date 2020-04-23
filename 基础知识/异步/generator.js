import { rename } from "fs";


{
    let x = 1;

    function foo(){
        x++;
        // 我们确信bar()会在x++和console.log(x)之间运行
        // 现在试着思考一下 如果bar不在那儿 但是出于某种原因 它仍然可以在x++和console.log()之间运行 这如何实现
        bar();
        console.log(x,'xxxxxxxxx');
     }

     function bar(){
         x++;
     }
}


{
    // 使用generator函数就可以
    let x = 1;
    function *foo(){
        x++;
        yield;
        console.log(x,'xxxxxxxx');
    }

    function bar(){
        x++;
    }

    let r = foo(); // 构造了一个迭代器iterator
    r.next();
    bar();
    r.next();
}

// -> 内建消息__输入输出__能力
{
    function *foo(x) {
        // 在赋值语句中间停止
        var y = x * (yield);
        return y;
    }
    var it = foo(6);
    // 启动foo(..)
    it.next();
    // 将7做为yield的表达值
    var res = it.next(7);
    console.log(res.value); // 42
}


// 通过 yield 和 next 建立双向消息传递
// yield 和 next这一对组合起来 在生成器的执行过程中构成了一个双向消息传递系统
{
    function *foo(x) {
        var y = x * (yield "Hello"); // <-- yield一个值！
        return y;
    }
        
    var it = foo(6);
    var res = it.next(); // 第一个next() 并不传入任何东西
    console.log(res.value); // "Hello"
    res = it.next( 7 ); // 向等待的yield传入7
    console.log(res.value); // 42
}
// 一个最佳实践的建议:在启动生成器时 最好不要在next中传值

// 多个迭代器
// 同一个生成器的多个实例并发运行
// 通过两个生成器(甚至多个生成器)在共享的相同变量上的迭代交替执行
// 所以Javascript拥有了交替执行的能力
{
    function *foo() {
        var x = yield 2;
        z++;
        var y = yield (x * z);
        console.log( x, y, z );
    }
    
    var z = 1;
    var it1 = foo();
    var it2 = foo();
        
    var val1 = it1.next().value; // 2 <-- yield 2
    var val2 = it2.next().value; // 2 <-- yield 2
    
    val1 = it1.next( val2 * 10 ).value; // 40 <-- x:20, z:2
    val2 = it2.next( val1 * 5 ).value; // 600 <-- x:200, z:3
    
    it1.next( val2 / 2 ); // y:300
        // 20 300 3
    it2.next( val1 / 4 ); // y:10
        // 200 10 3
}


// 实现多线程竞态条件环境
{
    var a = 1,b = 2;

    function *foo() {
        a++;
        yield;
        b = b * a;
        a = (yield b) + 3;
    }

    function *bar() {
        b--;
        yield;
        a = (yield 8) + b;
        b = a * (yield 2);
    }

    function step(gen) {
        var it = gen();
        var last;
        return function() {
            // 不管yield出来的是什么，下一次都把它原样传回去！
            last = it.next( last ).value;
        };
    }
    var s1 = step( foo );
    var s2 = step( bar )

    s1()
    s1()
    s1()


    s2()
    s2()
    s2()
    s2()

    console.log(a,b); // 当然上述的代码会令人疑惑 
}


// 使用闭包 实现迭代器的效果
{
    function mockIterator(){
        let newVal;
        return function(){
            if(newVal == null){
                newVal = 1;
            }else{
                newVal = (newVal * 3) +1
            }
            return newVal;
        }
    }

    const fn = mockIterator()
    fn()
    fn()
    fn() 
}

// 当然 可以为我们的数字序列生成迭代器 -> 实现标准的迭代器接口

var someThing = (function(){
    var newVal;

    return {
        [Symbol.iterator]:function(){
            return this;
        },
        next: function(){
            if(newVal === undefined){
                newVal = 1;
            }else{
                newVal = (newVal * 3) + 1;
            }
            return {
                done: false, // 表明迭代器的完成状态
                value: newVal, // value中放置迭代值
            }
        }
    }
})()

someThing.next();
someThing.next();
someThing.next();
someThing.next();

// for...of 循环在每次迭代中自动调用next 并且它也不会在next中传任何值 在接到done:true之后会自动停止
// for...of 循环向a请求它的迭代器(也就是[Symbol.iterator]属性)
for(let v of someThing){
    console.log(v);
    if(v > 500){
        break;
    }
}

// Object类型故意没有iterator接口


/**  4.2.2 iterable   */


{
    var a = [1,3,4,7,9];
    var it = a[Symbol.iterator]();
    it.next().value;
    it.next().value;
    it.next().value;
}


// 如何判断一个对象是不是iterable

let obj = {};

function isIterable(obj){
    return obj[Symbol.iterator] != null &&  obj[Symbol.iterator].toString().indexOf('[native code]') > -1;
}

let r = isIterable(obj);

{
    function *someThing(){
        var nextVal;

        while(true){
            if(nextVal == null){
                nextVal = 1
            }else{
                nextVal = (3*nextVal) + 1;
            }

            yield nextVal;
        }

        // 生成器把 while true 重新带回了Javascript世界 
    }
    // 生成器的迭代器是一个iterable
    let r = someThing();

    for(let v of f){
        console.log(v,'v');
        if(v > 500){
            break;
        }
    }

    r.next();
    r.next();
    r.next();
}


{
    function *something() {
        try {
            var nextVal;
            while (true) {
            if (nextVal === undefined) {
                nextVal = 1;
            }
            else {
                nextVal = (3 * nextVal) + 6;
            }
            yield nextVal;
            }
        }
        // 清理子句
        finally {
            console.log( "cleaning up!" );
        }
    }

    let it = something();

    for(let v of it){
        console.log(v,'generator value');
        if(v > 500){
            it.return('hello world')
        }
    }
}


// 异步迭代生成器
{
    function foo(x,y) {
        ajax("http://some.url.1/?x=" + x + "&y=" + y , function(err,data){
            if (err) {
            // 向*main()抛出一个错误
                it.throw( err );
            }else {
                // 用收到的data恢复*main()
                it.next( data );
            }
        }
        );
    }

    function *main() {
        // 在生成器内抛出错误
        try {
            // 这里有一个yield关键字 
            // yield可以同步捕获来自异步函数调用的错误
            var text = yield foo( 11, 31 );
            console.log( text );
            // 其实这段代码和之前那个类似
            // let data = ajax()
            // console.log(data,'haha what is data');

            }
        catch (err) {
            console.error( err );
            }
    }
        
    var it = main();
    // 这里启动！
    it.next();

    // 在生成器内部有了看似完全同步的代码
    // 这种表达能力是可以无限扩展的
}

{
    function *main() {
        var x = yield "Hello World";
        yield x.toLowerCase(); // 引发一个异常！
    }
    
    var it = main();
    it.next().value; // Hello World
    
    // 我们也可以从生成器外抛出错误
    try {
        it.next( 42 );
    }catch (err) {
        console.error( err ); // TypeError
    }
}

{
    function *main() {
        var x = yield "Hello World";
        // 永远不会到达这里
        console.log( x );
    }
    
    var it = main();
        it.next();
        try {
            // *main()会处理这个错误吗？看看吧！
            it.throw( "Oops" );
        }catch (err) {
            // 不行，没有处理！
            console.error( err ); // Oops
        }
}

{
    function foo(x,y) {
        return request("http://some.url.1/?x=" + x + "&y=" + y);
    }
    
    function *main(){
        try {
            var text = yield foo( 11, 31 );
            console.log( text );
        }catch (err) {
            console.error( err );
        }
    }
    // 先从手工执行开始
    var it = main();
    var p = it.next().value;
    // 等待promise p决议
    p.then(
        function(text){
            it.next( text );
        },
        function(err){
            it.throw( err );
        }
    );
}

// 如果有一种方法可以重复(即循环)迭代控制 每次都会生成一个Promise 等其决议后再继续 并且合并地处理错误

{
    // 如何实现一个异步迭代生成器 -> 本质上 这也是async+await的一个实现
    function run( gen ){
        // 首先截取参数(从第二个参数开始)
        var args = [].slice.call( arguments,1 ),it;
        // 启动生成器
        it = gen.apply(this.args);

        return Promise.resolve().then(function handleNext(value){
            var next = it.next(value); // 获取迭代器值

            return ( function handleResult(next){
                if(next.done){
                    return next.value; // 返回最后的值
                }else{
                    return Promise.resolve(next.value).then( handleNext,function handleErr(err){
                        return Promise.resolve(it.throw(err)).then(handleResult)
                    } )
                }
            })(next)
        })
    }

    // 非常简单 使用这段代码
    function *main(){
    }

    run(main);
}


// 多并发的场景下
{
    function *foo(){
        var r1 = yield request( "http://some.url.1" );
        var r2 = yield request( "http://some.url.2" );
        var r3 = yield request(
        "http://some.url.3/?v=" + r1 + "," + r2
        );
        console.log( r3 );
    }

    // 该代码并非最优代码 
    // 原因在于 这些代码是按照顺序依次执行的
}


// 一个优化版的代码
{
    function *foo() {
        // 让两个请求"并行"
        var p1 = request( "http://some.url.1" );
        var p2 = request( "http://some.url.2" );
        // 等待两个promise都决议
        var r1 = yield p1;
        var r2 = yield p2;
        var r3 = yield request(
        "http://some.url.3/?v=" + r1 + "," + r2
        );
        console.log( r3 );
        }
        // 使用前面定义的工具run(..)
        run( foo );
}


// 基于Promise的更简洁的方案
{
    
    function bar(url1,url2) {
        return Promise.all( [
            request( url1 ),
            request( url2 )
        ]);
    }
    function *foo() {
        // 隐藏bar(..)内部基于Promise的并发细节
        var results = yield bar(
            "http://some.url.1",
            "http://some.url.2"
        );
        var r1 = results[0];
        var r2 = results[1];
        var r3 = yield request("http://some.url.3/?v=" + r1 + "," + r2);
        console.log( r3 );
    }
    // 使用前面定义的工具run(..)
    run( foo );
}



