import { formatWithOptions } from "util";

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



