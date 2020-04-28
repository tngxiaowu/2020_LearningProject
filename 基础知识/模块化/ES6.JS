var counter = 1;

function increment() {
  counter++;
}

function decrement() {
  counter--;
}

module.exports = {
  counter: counter,
  increment: increment,
  decrement: decrement
};

// src/main.js

var counter = require('../../lib/counter');

counter.increment();
console.log(counter.counter); // 1

// main.js当中的实例和原本模块是完全不相关的




// a.js
import { foo } from'./b';
console.log('a.js');
export const bar = 1;
export const bar2 = () => {
  console.log('bar2');
}
exportfunction bar3() {
  console.log('bar3');
}

// b.js
export let foo = 1;
import * as a from'./a';
console.log(a);



// a.js
exports.done = false; // a.js 执行到这 -> a.done = false (a.js只执行到这)
/*    ===================== */
var b = require('./b.js’); 
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');

// b.js
exports.done = false; // b.done = false
var a = require('./a.js'); // a.done = flae
console.log('在 b.js 之中，a.done = %j', a.done);  
exports.done = true; // b.done = true 
console.log('b.js 执行完毕');

// main.js
var a = require('./a.js');  
// 开始加载 a 模块
// a.js
export.done = false;
var b = require('./b'); 
// 开始加载 b 模块(a模块已经加载完毕)
export.done = false;
var a = require('./a'); 
// 有加载a模块 执行到export.done = false
// 执行b模块下其他


var b = require('./b.js');
// 开始加载b模块
// export.done = false(b模块加载完毕)
// 开始加载a模块
// export.done = false
// 加载b模块 b = {done:false}
// 

console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);



// ES6 模块循环加载

// a.mjs

// 执行 a.mjs 
import { bar } from'./b'; // 执行b.mjs
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';
    
// b.mjs
import {foo} from'./a'; // 此时的foo是undefined
console.log('b.mjs');
console.log(foo);
exportlet bar = 'bar';