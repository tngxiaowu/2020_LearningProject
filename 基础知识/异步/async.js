(async () => {
    const pizzaData = await getPizzaData(); // async call ->阻塞
    const drinkData = await getDrinkData(); // async call -> 阻塞
    const chosenPizza = choosePizza(); // sync call
    const chosenDrink = chooseDrink(); // sync call
    await addPizzaToCart(chosenPizza); // async call
    await addDrinkToCart(chosenDrink); // async call
    orderItems(); // async call
  })();

  // await语法本身没有问题 有时候可能是使用者用错了 -> async/await会不会被滥用
  // async/await真的是语法糖 功能也仅仅是让代码写的舒服
  // 功能的完整度和使用便利度一直是相互博弈的
  // 语法的简化 带来了性能问题 导致用户体验变差 是不是需要反思一下


  (async () => {
    const pizzaPromise = selectPizza();
    const drinkPromise = selectDrink();
    await pizzaPromise;
    await drinkPromise;
    orderItems(); // async call
  })();

  // async/await只能实现一部分回调支持功能 -> 方便应对层层嵌套的功能
  // -> 对于其他场景 需要动一些脑子

  // 处理两队回调的场景
  a(() => {
    b();
  });
  
  c(() => {
    d();
  });

  // 这种肯定是最低效的方式
  await a();
  await b();
  await c();
  await d();

  // 优化一下
  const resA = a(); // 执行A
  const resC = c(); // 执行C
  await resA; // 等A执行完
  b();
  await resC; // 等C执行完
  d();

  // 如何用好async/await是需要技巧的

  // 回调过程这么简单的代码 换成async/await还需要这么麻烦


// 声明阶段
// 执行阶段  

// Statement Declare -> 语句声明
// fn1:async1
// fn2:async2
async function async1() {
    console.log('async1 start') // [2] script start 
    // await函数会跳出主线程 继续执行其他
    // await会根据其右边的表达式类型 -> Promise或者非Promise对象
    await async2() // -> 
    
    console.log('async1 end') // [4] async end
}

async function async2() {
    console.log('async2')
}
// 执行
// calling script start
console.log('script start') // -> [1] script start

setTimeout(function() {
    console.log('setTimeout')  // [8]
}, 0)  // 产生一个宏任务 -> 匿名函数fn function(){} 

async1() // 异步

new Promise(function(resolve) { // add new microTask -> 新增微任务 
    console.log('promise1') // [5] promise1
    resolve()
}).then(function() {
    console.log('promise2') // [7] 
}) 

console.log('script end') // -> [6] script end
// calling script end