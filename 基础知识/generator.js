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


