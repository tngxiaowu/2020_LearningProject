// 给每个函数实例上添加一个方法
Function.prototype.fakeCall = function(context){
	context = context || window; // [1]. 当传入参数是null 或者 undefined 指向全局变量
	// ES3写法
	let args = [];
	for(let i = 1; i < arguments.length; i++){
		args.push('arguments[' + i+']');
	}
	// ES6写法
	// let args = [...arguments].splice(1) 
	context.fn = this; // 获取调用的函数

	let result = eval('context.fn(' + args + ')');  
	// let result = context.fn(...args);
	delete context['fn']; // 删除该属性
	
	return result; 
}

// 请写一个bind的profill
Function.prototype.fakeBind = function(context){
	context = context || window;
	console.log('context',context);
	var args = [];

	// 处理从第二个开始的参数
	for(var i = 1; i < arguments.length; i++){
		args.push( arguments[i]);
	}

	console.log(args,'args')
	
	let fn = this; // 获取本身的函数

	return function(){
		let innerArgs = []
		for(var i = 1; i < arguments.length; i++){
			innerArgs.push( arguments[i]);
		}

		// 使用call去
		return fn.call(context,...args , ...innerArgs)
	}
}

// 如果用let去定义变量 那么scope属性就不会被赋值到全局变量上
var scope = 'Global Scope';

let obj = {
	a:1,
	scope:'local-scope',
}

function bar(name,age){
	return {
		name:name,
		age:age,
		scope: this.scope
	}
}

let fakeBindBar = bar.fakeBind(obj,'laowang');

let o = fakeBindBar()

console.log( o ,'scope');

var name = 'Global-Name'

function Person(name){
	this.name = name;
	let self = this; // 緩存this
	this.sayName = function(){
		setTimeout( function(){
			console.log(this.name)
		 }.bind(this),1000) // 使用Bind
	}
}

let Peter = new Person('Jack');

Peter.sayName(); // Result: Global-Name

var toString = Function.prototype.call.bind( Object.prototype.toString )

// 解決方法1: Bind

// 解決方法2:

// 解決方法3




function create(){
// 首先创建一个对象
let obj = Object.create(null);
// 获取构造函数
let Con = Array.prototype.shift.call(arguments)
// 原型链修改
obj.__proto__ = Con.prototype; 
// 执行函数 + this指定
let result = Con.apply(obj ,arguments)
// 返回函数

return result === 'object' ? result : obj;

}
function Person(name){
	this.name = name;
}






// bind基础用法




// function Person(age){
// 	this.age = age;
// }

// let a = new Person(); 


// var a = 'Global Scope';

// function foo(){
// 	var a = 'Local Scopr'
// 	console.log(this.a); 
// }

// var obj = {
// 	a: 'level 1 local scope ',
// 	o:{
// 		a :  'level 2 local scope',
// 		fn: foo,
// 	},
// 	fn: foo
// }


// obj.fn(); // level 1 local scope 
// obj.o.fn(); // level 2 local scope


// function Create(){
// 	let Obj =  new Object() // 新建一个对象

// 	let Con = [].shift.call(arguments) // 将函数的第一个元素从数组中剔除 返回该元素 并且影响该数组

// 	Obj.__proto__ = Con.prototype; // 将构造函数引向原型链

// 	let result = Con.call(Obj,arguments) // 执行构造函数

// 	return typeof result === 'object' ? result : Obj;

// }

// foo(); // 非严格模式下 
// let obj = {
// 	a: 'local scope',
// 	fn: foo
// }


// let fn = obj.fn;
// 当它执行时 它的引用位置是obj 
// obj.fn();
// fn是全局对象下的一个变量
// 当它执行时 它的调用位置是 前一个执行上下文 -> 全局变量 
// function baz() {
// 	// 当前调用栈是：baz
// 	// 因此，当前调用位置是全局作用域
// 	console.log( "baz" );
// 	bar(); // <-- bar的调用位置
//   }

// function bar() {
// 	// 当前调用栈是：baz --> bar
// 	// 因此，当前调用位置在baz中
// 	console.log( "bar" );
// 	foo(); // <-- foo的调用位置
//   }

// function foo() {
// 	// 当前调用栈是：baz --> bar --> foo
// 	// 因此，当前调用位置在bar中
// 	console.log( "foo" );
// }
// baz(); // <-- baz的调用位置

// // 暴露模块 calc.js
// const { PI } = Math;
// exports.calArea = r => 2 * PI * r;

// // 引入模块 main.js
// const cal = require("./calc.js"); // 引入方式1
// const { calArea } = require("./calc.js"); // 引入方式2

// cal.calArea(2);

// // 以下是AMD
// // 暴露模块
// define(function() {
//   const { PI } = Math;
//   const calArea = r => 2 * PI * r;
//   return {
//     calArea
//   };
// });

// // 引入依赖模块
// // 第一个参数以数组的形式声明依赖
// define(["jQuery"], function($) {
//   const setBodyColor = color => {
//     $("body").css("color", color);
//   };
//   return setBodyColor;
// });

// require.config({
//   baseUrl: "/",
//   path: {
//     setBodyColor: ""
//   }
// });

// require(["calArea", "setBodyColor"], function(calArea, setBodyColor) {
//   const r = 10;
//   const color = "#ffffff";
//   calArea(r);
//   setBodyColor(color);
// });

// // CMD风格
// // CMD的写法比AMD更简单易懂
// // 比起CMD 兼容 COMMONJS 和 AMD

// // 暴露模块
// define(function(require, module, exports) {
//   const { PI } = Math;
//   const caclArea = r => 2 * r * PI;
//   module.exports = { caclArea };
// });

// // 引入模块
// define(function(require, module, exports) {
//   // 直接简单地使用require就行
//   const $ = require("./jquery");
//   const setBodyColor = color => {
//     $("body").css("color", color);
//   };
//   module.exports = {  setBodyColor };
// });

// let http = require("http");

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text-plain" });
//     res.end("hello! nodeJs");
//   })
//   .listen(3000, "127.0.0.1");

// function flternArray(array) {
//   for (let arr of array) {
//     if (Array.isArray(arr)) {
//       return Array.prototype.concat.apply([], array);
//     }
//   }

//   return array;
// }

// console.log(flternArray([[1, 2, 3],[4],[5,6,7] ]));



// ASSETS = [ 'component','directive','filter']
ASSETS.TYPE.forEach( type =>{
	Vue[type] = function(id,definition){
		// 异步组件的话 传入的definition不是一个纯对象 而是数组 
		if(type === 'component' && isPlainObject(definition) ){
			definition.name = definition.name || id;
			definition = this.$options._base.extend(definition); 
		}
		// 但是我们把这个数组放进$options[components][id]中
		this.$options[type+'s'][id] = definition; // 存储在大V的$options内
	}
})


// 确保函数只执行一次
function once(fn){
	let  called = false;
	return function(){
		if(!called){
			called = true;
			fn.call(this,arguments);
		}
	}
}

// 每一个异步加载的上下文都执行一次视图更新($forceUpdate)
function forceRender(renderCompleted){
	for(let i = 0; i < owners.length; i++){
		owners[i].$forceUpdate();
	}
	if(renderCompleted){
		// 清除loading
		if(timerLoading !== null){

		}
		// 清除超时
		if(timerTimeout !== null){

		}
	}
}



const resolve = once(  (res)=>{
	// 缓存 数组对象 并且 在缓存前 对该数组对象 进行构建
	factory.resolved = ensureCtor(res,baseCtor); // 简单来说 就是构建一个子对象

	if(!sync){
		forceRender(true);
	}else{	
		owner.length = 0;
	}
})


function initData(vm){
	let data = vm.$options.data; // 读取数据

	// 
	data = typeof data === 'function' ? getData(data) : data || {};

	//  
	if(!isPlainObject(data)){}

	let keys = Object.keys(data);
	let props = vm.$options.props;
	let methods = vm.$options.methods;
	let i = keys.length;
	// 检验 变量 和 方法是否重名
	while(i--){
		checkPropsName(); // 检验props名
		checkMethodsName(); // 检验方法名
		Proxy(vm,'_data',keys[i])
	}
	// 对data进行响应式设定
	observe(vm,data);
}


// 借用构造函数
// 组合继承
function Super(name){
	this.name = name;	
}

Super.prototype.getSuper = function(){
	return this.name;
};

function Sub(name,age){
	// 使用借用构造函数继承父类实例上的方法和属性
	Super.call(this,name);
	this.age = age;
}

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;



// 原型式继承
function object(obj){
	// 创建一个空的构造函数
	function F(){}
	F.prototype = obj;
	return new F();
}




// 初始化props
function initProps(vm,propOptions){
	const keys = vm.$options._propKeys = []; // 通过_propKeys收集props名
	const props = vm._props = {};  // 所有props的数据 都加载在 vm._props上
	const isRoot = !vm.$parent; // 判断是否为根组件

	for(let key in propOptions){
		keys.push(key); // 收集key名
		const value = validateProps(); // 解析得到Value的值

		const hyphenatedKey = hyphenate(key) 
		if(isReserverdAttritube(hyphenatedKey)){
			warn(`Do not use reserver attributed`) // 校验props 是否为关键字
		}

		defineReactive(props,key,value);  // 对props做响应式处理
 
		if(!(key in vm)){
			Proxy(vm,'_props',key);  // 连接vm.key = vm._props.key
		}

	}

	toggleObserving(true)
}


function observer(value,asRootData){
	// 校验 value值的类型
	if(isObject(value) || value instanceof vNode){
		return;
	}

	// 核心代码 
	let ob;
	if(hasOwn(value,'__ob__') && value.__ob__ instanceof Observer ){
		ob = value.__ob
	}else if( /* a few judge */ ){
		ob = new Observer()
	}

	if(asRootData && ob){
		ob.vmCount++
	}

	return ob;
}


function defineReactive(obj,key,val,customSetter,shaldow){
	let dep = new dep();// 初始化一个依赖收集器
	let description = Object.getOwnPropertyDescriptor(obj);  // 拿到该对象上的getter和setter
	let setter = description.setter;
	let getter = description.getter;

	Object.defineReactive(obj,key,{
		enumerable:true,
		configurable: true,

		get: function reactiveGetter(){
			const value = getter ? getter.call(obj) : val;

			if(Dep.target){
				dep.depend(); // 依赖收集
			}

			return value;
		}, 

		set: function reactiveSetter(newVal){
			const value = getter ? getter.call(obj):value
			// 如果值没有发生变化 就不启动更新
			if(value === newVal){
				return;
			}

			if(setter){
				setter.call(obj)
			}else{
				val = newVal
			}
			dep.notify(); // 派发依赖
		} // 派发更新
	})
}




function inheritPrototype(subType,superType){
	let prototype = Object.create(subType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

function superType(name){
	this.name = name;
	this.colors = ['red','green','yellow'];
}

superType.prototype.sayName = function(){
	return this.name;
}

function subType(name,age){
	subType.call(this,name); // 借用构造函数 
	this.age = age;
}

// 
function Parent(){

}

function Sup(name){
	this.name = name;
	this.colors = ['red','green']; // 对父类引用类型的操作会覆盖
  }
  
  Sup.prototype.getName = function(){
	console.log('I am Super');
  };
  
  function Sub(age){
	this.age = age;
  }
  
  Sub.prototype = new Sup();
  
  Sub.prototype.getAge = function(){
	console.log(this.age);
  } // 子类上的原型方法必须在原型链修改后才可以写
  
  let sub = new Sub(18); // 无法向父类传参 
  let suc = new Sub(19);
  
  sub.getName();
  sub.getAge();
  
  console.log(sub instanceof Sup); // 构造函数熟悉被重写 true
  console.log(sub instanceof Sub); // 构造函数熟悉被重写 true


  // dep.js

  
  let dep =  {
	id:1,
	subs:[ watcher]
  }

  let watcher = {
	  id:2,
	  newDepIds:[1],
	  newDeps:[ dep, ],
  }


























