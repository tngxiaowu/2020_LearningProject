// 异步回调是最单解决 从现在到将来 等待的一种方法
const res = ajax(api);
console.log( res );
// 假设只需上述代码 res返回的值肯定是undefined

ajax(api, (data) =>{
    console.log(data);
})
// 我们可以通过回调 拿到值
