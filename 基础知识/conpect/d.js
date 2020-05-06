// // 依赖引入部分
// const path = require('path'); // 路径模块
// const SingleEntryPlugin = require("webpack/lib/SingleEntryPlugin"); // 单个入口文件
// const MultiEntryPlugin = require("webpack/lib/MultiEntryPlugin"); // 多个入口文件

// // 重新布置入口文件
// const itemToPlugin = ( context,item, name) =>{
//   if(Array.isArray(item)){
//     return new MultiEntryPlugin( context,item,name )
//   }
//   return new SingleEntryPlugin( context,item,name)
// }

// // 类的编写
// // 自定义写一个webpack插件
// class DebugPlugin{
//   constructor(options){
//     this.options = Object.assign({},{enabled:true},options)
//   }

//   apply(compiler){
//     // 在compiler的entryOptions钩子上(也就是在配置入口文件时)
//     // tap类似于js中的addEventListener 绑定事件用
//     compiler.hooks.entryOption.tap( 'vc-debug',(contetx,entry)=>{
//       const { enabled } = this.options;
//       let vConsole = require('./vConsole.js')
//       if(enabled){
//           // 将
//           if(typeof entry === 'string'){
//             entry = [ vConsole,entry ]
//           }else if(Array.isArray(entry)){
//             entry.unshift(vConsole)
//           }else if(typeof entry === 'object') {
//             entry[key] = vConsole
//           }

//           // 在编译过程中动态地加入 入口文件
//           if(typeof entry === 'string' || Array.isArray(entry)){
//             itemToPlugin(contetx,entry,'app'  ).call(compiler)
//           }else if(typeof entry === 'object'){
//             for(let name of Object.keys( entry )){
//               itemToPlugin(contetx,entry[name],name  ).call(compiler)
//             }
//           }

//           return true;
//       }

//     })

//   }
// }

// // 输出类
// module.exports = DebugPlugin;

// function Foo(name){
//   this.name = name;
// }

// let f = new Foo('Hu');

// f.__proto__ === Foo.prototype;

// function Sup(name){
//   this.name = name;
//   this.colors = ['Green','Blue'];
// }

// function Sub(name,age){
//   Sup.call(this,name);
//   this.age= age;
// }

// let s = new Sub('laowang',18);

// console.log(s,'ssssss');
// console.log('=========')

// // 实现原理
// // 请手写一个函数 来模拟实现instanceof
// // 参数1:实例  参数2:构造函数
// function instance_of(Obj,Con){
//   if(Obj == null){
//     throw new Error('undefined or null has not prototype!');
//   }  // 过滤掉null 和 undefined

//   let proto = Object.getPrototypeOf(Obj);
//   let con =  Con.prototype;

//   while(true){
//     if(proto === null) return false;
//     if(proto === con) return true;
//     proto = Object.getPrototypeOf(proto)
//   }
// }

// // 类工厂
// let JS = {
//   version:'1.0.0'
// }

// JS.Class = function( ClassDefinition ){
//   // 返回目标类的真正构造器
//   function getClassBase(){
//     return function(){
//       if(typeof this['construct'] === 'function' && preventJSBaseConstructorCall ){
//         this['construct'].apply(this,arguments)
//       }
//     }
//   }

//   // 为目标类添加类成员以及原型成员
//   function CreateClassDefinition( ClassDefinition ){
//     let parent = this.prototype['parent'] || (this.prototype['parent'] = {});
//     for(let prop in ClassDefinition){
//       // 如果是类的静态属性/方法
//       if(prop === 'statcis'){
//         for( let sprop in ClassDefinition.statcis ){
//           this[sprop] = ClassDefinition.statcis[sprop]
//         }
//       }else{
//         if(typeof this.prototype[prop] === 'function'){
//           let parentMethod = this.prototype[prop]
//           parent[prop] = parentMethod
//         }
//         this.prototype[prop] = ClassDefinition[prop]
//       }
//     }
//   }

//   let preventJSBaseConstructorCall = true;
//   let Base = getClassBase()
//   preventJSBaseConstructorCall = false;

//   Base.extend = function(){

//     preventJSBaseConstructorCall = true;
//     let SonClass = getClassBase()
//     SonClass.prototype = new this(); // 原型继承
//     preventJSBaseConstructorCall = false;

//     CreateClassDefinition(SonClass,ClassDefinition)

//     SonClass.extend = this.extend;

//     return SonClass;
//   }
//   return Base;
// }

// function defineReactive(obj,key,val){
//   Object.defineProperty(obj,key,{
//     set:function ReactiveSetter(newVal){
//       const value = getter ? getter.call(obj) : val; // 获取当前的值
//       // 如果数值没有变化 直接结束 不做派发更新
//       if(newVal === value){
//         return;
//       }
//       // 更新数值
//       if(setter){
//         setter.call(obj,newVal);
//       }else{
//         val = newVal;
//       }
//       dep.notify(); // 派发通知
//     }
//   })
// }

// const has = {};
// let flushing = false;
// let waiting = false;
// let queue = [];

// function queueWatcher(watcher) {
//   let id = watcher.id;
//   // 确保watcher只执行一次
//   if (has[id] == null) {
//     has[id] = true;
//     if (!flushing) {
//       queue.push(watcher); //核心1:将watcher放入队列
//     } else {
//     }

//     if (!waiting) {
//       waiting = true;
//       // 异步处理逻辑 略

//       // 同步处理逻辑
//       nextTick(fulshSchedulerQueue); // 核心2: 执行nextTick方法 将fulshSchedulerQueue作为回调
//     }
//   }
// }

// function fulshSchedulerQueue(){
//   let watcher,id;
//   for(let i = 0 ; i< queue.length; i++){
//     watcher = queue[i];
//     id = watcher.id;

//     has[id] = null;
//     watcher.run()  // 核心: 执行run方法
//   }

//   resetSchedulerState() // 状态置空
// }

// class Watcher{
//   run(){
//     if(this.active){
//       const value = this.get(); // 在初始化wathcer时 get函数就是updateComponent

//       if(value !== this.value){
//         const oldValue = this.value;
//         this.value = value;
//         if(this.user){ // 如果是写在模板里的watcher或者使用$watch 那么执行回调函数
//           this.cb.call(vm,value,oldValue);
//         }
//       }
//     }
//   }
// }

// var name = 'Global Name';
// (function(){
//  // 如果没有提前声明 就会被默认为var name;
//  if(typeof name === 'undefined'){
//     var name = 'Jack';
//     console.log(`Goodbye ${name}` );
//  }else{
//   console.log('Hello'+ name);
//  }
// })();

// Global Context
// name

// IF Context
// name

// function isNative(fn){
//   return typeof fn === 'function' && /native code/.test(fn.toString());
// }

// let timerFunc;
// let isUsingMircoTask = false;

// if(typeof Promise !== 'undefined' && isNative(Promise)){

//   const p = Promise.resolve();

//   timerFunc = ()=>{
//     p.then(flushCallbacks);

//     if(isIOS) setTimeout(noop); // IOS设备的补丁

//   }

//   isUsingMircoTask = true;

// }else if(!isIE() && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString() === '[Object MutationObserver]')){

//   let counter = 1;
//   let ob = new MutationObserver(flushCallbacks);

//   let textNode = document.createTextNode(String(counter))

//   ob.observe( textNode,{
//     characterData:true
//   } )

//   timerFunc = ()=>{
//     counter = (counter + 1) % 2
//     textNode.data = Srring(counter)

//   }

//   isUsingMircoTask = true;

// }else if(typeof setImmediate !== 'undefined' && isNative(setImmediate)){

//   timerFunc = ()=>{
//     setImmediate(flushCallbacks)
//   }

// }else{
//   timerFunc = ()=>{
//     setTimeout(flushCallbacks)
//   }

// }

// function nextTick(cb,ctx){
//   let _resolved;

//   // 把回调函数压栈
//   callbacks.push( ()=>{
//     if(cb){
//       try{
//         cb.call(ctx)
//       }catch(err){
//         hendleError(err,ctx,'next-tick')
//       }
//     }else if(_resolved){
//       _resolved(ctx)
//     }
//   })

//   //
//   if(!pending){
//     pending = true;
//     timerFunc() // 调用一个异步操作
//   }

//   // 在未传入回调函数的情况下 写成一个promise形式
//   if(!cb && typeof Promise !== 'undefined'){
//     return new Promise( resolve =>
//       _resolved = resolve
//    )
//   }
// }

// let arr =[1,2,3,5]

// let arr2 =arr.filter(  item => item > 2 );
// let arr3 = arr.map(item => item * 2);

// // 无初始值
// let value1 = arr.reduce( (accumaltor,currentValue,currentIndex,array)=>{
//   return accumaltor  + currentValue;
// })

// // 有初始值
// let value2 = arr.reduce( (accumaltor,currentValue,currentIndex,array)=>{
//   return accumaltor  + currentValue;
// },10)

// let isType = type  => obj  => {
//   return Object.prototype.toString.call(obj) === `[Object ${type}]`};

// let add = (a = 0) =>{
//   function sum(b = 0){
//     a = a + b;
//     return sum;
//   }

//   // 在打印函数时会自动调用toString函数 牛逼！
//   sum.toString = function(){
//     return a;
//   };

//   return sum;
// };

// let a = add(1)(2)(3)

// // 扁平化去重
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// function flatern(arr){
//   let result = [];

//   for(let item of arr){
//     let deep = 0;
//     if(Array.isArray(item)){
//       deep += 1;

//     }else{
//       arr.push(item);
//     }
//   }
// }

// let flat = (arr)=>{}

// arr.filter( item =>  Array.isArray(item)).map( item => {})

// console.log('arr',arr2,arr3,value1,value2,a);

// const computedWatcherOptions = { lazy: true }

// // 初始化computed属性
// function initComputed( vm,computed){
//   let watcher = vm._computedWatchers = Object.create(null);
//   let isSSR = isServiceRendering();

//   for(const key in computed){
//     const userDef = computed[key];
//     const getter = typeof userDef === 'function' ? userDef : userDef.get;

//     // 如果在开发环境并且getter为null/undefined 报错

//     // 实例化watcher
//     if(!SSR){
//       watcher[key] = new watcher( vm,getter||noop,noop,computedWatcherOptions )
//     }

//     if(!(key in vm)){
//       defineComputed(vm,key,getter)
//     }else{
//       // 找到在vue组件中哪个被
//     }
//   }
// }

// // 定义计算属性
// function defineComputed( target,key,userDef){
//   const shouldCache = !isServiceRender();

//   // 如果computed是函数写法
//   if(typeof userDef === 'function'){
//     sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(key)
//     sharedPropertyDefinition.set = userDef.set || noop;
//   }else{

//   }

//   Object.defineProperty( target,key, sharedPropertyDefinition);
// }

// function createComputedGetter(key){
//   return function computedGetter(){
//     // 核心代码: 读取watcher
//     const watcher = this._computedWatchers && this._computedWatchers[key]
//     // 若watcher存在 最终返回watcher的值
//     if(watcher){
//       if(watcher.dirty){

//       }

//       if(Dep.target){
//         watcher.depend()
//       }

//       return watcher.value;
//     }
//   }
// }

const add = (...args) => args.reduce((a, b) => a + b);

let currying = func => {
  const args = [];
  return function result(...rest) {
    if (rest.length === 0) {
      return func(...args);
    } else {
      args.push(...rest);
      return result;
    }
  };
};

const sum = currying(add);
console.log(sum(1, 2)(3));
console.log(sum(4));
console.log(sum());

// 动态创建函数

let addEvent = (type, el, fn, capture = false) => {
  if (window.addEventListener) {
    el.addEventListener(type, fn, capture);
  } else if (window.attachEvent) {
    el.attachEvent("on" + type, fn);
  }
};

// 我们经常会使用上述的方式对浏览器进行能力检测(区分是在IE还是非IE浏览器)
// 但这种写法的问题就是 每次添加事件是总会调用一次 频繁调用 能不能一次解决呢?
// 使用IIFE+闭包处理
// const addEventPlus = (function() {
//   if (window.addEventListener) {
//     return function(type, el, fn, capture = false) {};
//     el.addEventListener(type, fn, capture);
//   } else if (window.attachEvent) {
//     return function(type, el, fn, capture = false) {
//       el.attachEvent("on" + type, fn);
//     };
//   }
// })();

// // 惰性函数的写法
// let addEventLazy = (type,el,fn ,capture = false) =>{
//   if(window.addEventListener){
//     addEventLazy = (type,el,fn ,capture = false) =>{
//       window.addEventListener(type,fn,capture)
//     }
//   }else if(window.attachEvent){
//     addEventLazy = ( type,fn ) =>{
//       window.attachEvent('on'+type,fn)
//     }
//   }

//   // 有循环爆栈的风险 可用计时器控制一下
//   addEventLazy(type,el,fn,capture);
// }

// // 参数复用

// let tellType = type => ( obj ) => Object.prototype.toString.call(obj) === `[Object ${type}]`;

// let tellTypeByBind =  () => Function.prototype.call.bind(Object.prototype.toString)

// let mockCurrying =  (fn,length) => {
//   length = length || fn.length
//   return function(...args){
//     return args.length >= length ? fn.app
//   }
// }

// function Car(options){
//   this.wheels = options.wheels || 4;
//   this.brand = options.brand || 'Car Brand';
//   this.color = options.color || 'Black';
// }

// function Trunk(options){
//   this.wheels = options.wheels || 6;
//   this.brand = options.brand || 'Trunk Brand'
//   this.colors = options.color  || 'red';

// }

// function VehicleFactory(){}

// VehicleFactory.prototype.vehicleClass = Car;

// VehicleFactory.prototype.createVehicle = function(options){
//   if(options.vehicleType === 'car'){
//     this.vehicleClass = Car;
//   }else{
//     this.vehicleClass = Trunk
//   }

//   return new this.vehicleClass(options);
// };

// let Cat = class {
//   constructor(options){
//     this.name = 'Cat';
//   }
// };

// let Dog = class {
//   constructor(options){
//     this.name = 'Dog';
//   }
// };

// let AnimalFactory = class{
//   constructor(){

//   }
//   createBios(options){
//     if(options.name === 'cat'){
//       this.biosClass = Cat;
//     }else if(options.name === 'dog'){
//       this.biosClass = Dog;
//     }

//     return new this.biosClass(options)
//   }
// };

// let af = new AnimalFactory()

// let ac = af.createBios({ name: 'cat' });
// let ad = af.createBios( { name:'dog' } );

// console.log( 'ac',ac,ad );

let a = {
  name: "laowang",
  age: 18
};

let b = {
  dec: {
    weight: "high",
    body: {
      feet: 4,
      hand: 2
    }
  }
};

const c = Object.assign(b, a);

// b.dec.weight = 'low';
// console.log('c',c);

// Object.prototype.is = function() {
//   console.log("haha , it is good!");
// };

// Object.defineProperty(Object, "assign", {
//   stter() {},
//   getter() {}
// });

// Object.defineProperty(Object,'a', {
//   enumerable:false,
// } )
// console.log('obj-a',Object.keys(Object))

// if (typeof Object.assign !== "function") {
//   Object.defineProperty(Object, "assign", {
//     value: function(target) {
//       if (target == null)
//         throw new Error("Cannot convert undefined or null to object");
//       let to = Object(target);
//       const rest = arguments.slice(1);

//       for (let obj of rest) {
//         if (obj != null) {
//           for (let key in obj) {
//             if (!Object.prototype.hasOwnProperty.call(obj,key)) {
//               to[key] = obj[key];
//             }
//           }
//         }
//       }
//       return to;
//     },
//     enumerable:false, // Object上的原生属性是不可枚举的 Object.keys(Object) => 【】
//     writable: true,
//     configurable: true
//   });
// }

// const d = Object.assign('abc' ,{ '2':1 } );

// console.log('ddddd',d);

// function end(element,start,end){
//   ASTTreeManagement(); // AST树管理
//   closeElement(element); // 关闭标签
// }

function chars(text: string) {
  handleChars(); // 处理文本
  createChildrenASTOfText(); // 生成文本的AST语法树
}

function handleChars() {
  if (!currentParent) warn("must require a root element!"); // 如果不存在父节点
  if (isIE && currentParent.tagName === "textarea") return; // 修复IE placeholder漏洞
  const children = currentParent.children;

  // 对text进行处理
  text =
    inPre || text.trim()
      ? isTextTag(currentParent) ? text : decodeHTMLChched(text)
      : !child.length ? "" : handleWhitespceOptions;

  if (text) {
    let child, res;
    // 有表达式的节点
    if (cond1) {
      child = {
        type: 2,
        expression: res.expression,
        toknes: res.toknes,
        text
      };
      // 纯文本节点
    } else if (cond2) {
      child = {
        type: 3,
        text
      };
    }
    if (child) {
      children.push(child);
    }
  }
}

function parseText(text, customReg) {
  const tagRe = customReg ? buildReg(customReg) : defaultReg;
  // 如果匹配不上 那么直接返回
  if (!tagRe.test(text)) {
    return;
  }

  const tokens = [];
  const rawTokens = [];
  let lastIndex = (tagRe.length = 0);
  let match, index, tokenValue;
  // 在这里 对其进行循环解析
  while ((mathc = tagRe.exec(text))) {
    index = match.index;
    // 一系列操作
  }

  // 返回一个
  return {
    expression: tokens.join("+"),
    tokens: rawTokens
  };
}

// 使用严格模式
("use strict");

// 给变量exports定义'_esModule'
Object.defineProperty(exports, "_esModule", {
  value: true
});

// 引入组件+处理组件
var _component = require("./component");
var _component2 = interopRequireDefault(_component);
var _message = require("./message");
var _message2 = interopRequireDefault(_message);

function interopRequireDefault() {
  return obj && obj._esModule ? obj : { default: obj };
}

// 环境判断
var ENV = process.node.NODE_ENV;
if (
  ENV !== "production" &&
  ENV !== "test" &&
  typeof console !== "undefined" &&
  typeof window !== "undefined" &&
  console.warn
) {
  console.warn("You are using a whole antd package!");
}

// 组件安装
var components = [_component2["default"]]; // 将组件维护进一个数组

var install = function install(Vue) {
  components.map(component => {
    Vue.use(component);
  });

  Vue.prototype.$message = _message2["default"];
};

if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

// 组件输出
exports.install = install;
exports._message = _message2["default"];
exports["default"] = {
  version: _version2["default"],
  install: install
};

// 使用严格模式
("use strict");
// 给exports变量赋值_esModule
Object.defineProperty(exports, "_esModule", {
  value: true
});
// 引入相关方法和变量 然后用_interopRequireDefault包裹它
var _babelHelperVueJsxMergeProps = require("babel-helper-vue-jsx-merge-props");
var _babelHelperVueJsxMergeProps = _interopRequireDefault(
  _babelHelperVueJsxMergeProps
);

var props = (0, buttonTypes2["default"])();

// 输出组件
exports["default"] = {
  name: "AButton",
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: props,
  data: function data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted: function mounted() {},
  updated: function updated() {},
  beforeDestory: function beforeDestory() {},
  methods: {},
  render: function render() {} // 关键点是ant-design返回的是一个渲染函数
};




