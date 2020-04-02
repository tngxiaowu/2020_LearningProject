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






