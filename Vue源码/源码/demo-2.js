
// setp1:初始化数据


function initData() {
  let data = this.$options.data; 
  onserve(data);
}


function observe(data) {
 // 主要判断是不是已经做过响应式处理
  let ob;
 // 如果没有 那么实例化Obesrver
  ob = new Observer(data); 
  return ob;
}

 class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, "__ob__", this);

    if (Array.isArray(value)) {
      // 判断是否支持__proto__属性
      // 数组响应式监听
      this.observeArray(value);
    } else {
      // 对象响应式监听
      this.walk(value);
    }

  }

  // ......


  walk(obj) {
    let keys = Object.keys(obj);
    for (let item of keys) {
      defineReactive(obj, item);
    }
  }
}

function defineReactive(obj, key, val, customSetter, shallow) {

  const dep = new Dep(); // 设置依赖收集
  const property = Object.getOwnPropertyDescriptor(obj, key);
  let getter = property && property.get;
  let setter = property && property.set;
  if( (!getter || setter) && arguments.length === 2 ){
    val = obj[key];
  }
  let childOb = !shallow && observe(val); // 判断监听是否是对象 

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,

    get: function reactiveGetter() {
      const value = getter ? getter.call(ibj) : val;

      if (Dep.target) {
        dep.depend(); 

        if(childOb){
          childOb.dep.depend();
          // 如果是数组 那么对数组进行响应式监听
          if(Array.isArray(value)){
            dependArray(value);
          }
        }
      }
      return value;
    },


    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(ibj) : val; // 获取原来的值

      if(newVal === value || ( value !== value && newVal !== newVal ) ){
        return;
      }

      val = newVal;

      childOb  = !shallow && observe(newVal); // 继续对新的值进行响应式监听

      dep.notify(); // 派发更新

    }
  });
}


// Dep的实例
dep = {
  id:Number,
  subs:[],
}

// Dep类中有一个非常
class Dep{
  static target
}


class Watcher(){

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  get () {
    pushTarget(this) // 将watcher实例放入Dep.target

    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }

      popTarget()

      this.cleanupDeps()
    }
    return value
  }
}


// 组件派发更新

dep.notify();

// 


for(let sub of this.subs){
  sub.update();
}


class Watcher{
  update(){
    if(this.lazy){
      this.dirty = true;
    }else if(this.sync){
      this.run();
    }else{
      queueWatcher(this)
    }
  }
}


const queue = [];

function queueWatcher(watcher){
  const id = watcher.id;

  if(has[id] == null ){
    has[id] = true;

    if(!flushing){
      queue.push(watcher);
    }else{
      // 重新插入
    }

    // flush队列只执行一次 
    // 最终 它会执行flushSchedulerQueue行数
    if(!waiting){
      waiting = true;

      nextTick(flushSchedulerQueue)
    }
  }
}

// next-tick核心机制

// 传入的参数是wathcer队列


let timeFunc; // 异步执行函数
let pending = false;  // 状态位 表示是否执行
const callbacks = []; // 回调队列

function nextTick( cb ){
  let _resolve;
  
  // 回调队列添加一个回调函数 
  // 这个回调函数以后讲述 
  callbacks.push( ()=>{
  })

  if(!pending){
    pending = true;
    // 异步执行
    timerFunc();
  }

  // 在没有cb的情况下 对_resolve赋值
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

// 这个例子中以Promise为例
timerFunc = () =>{
 let p = Promise.resolve()
 p.then( flushCallbacks )
}



function flushCallbacks(){
  // 状态位又复位了
  pending = false; 
  let copyies = callbacks.slice(0)
  callbacks.length = 0;
  // 遍历执行callbacks中的回调函数
  for(let i = 0;i < copyies.length;i++){
    copyies[i]() 
  }
}


callbacks.push( ()=>{

  // nextTick中的回调函数
  if(cb){
    try{
      cb.call(ctx) // 执行回调函数
    }catch(e){

    }
  }else if(_resolve){
    _resolve(ctx);
  }
})


function flushSchedulerQueue(){

  flushing = true;


  queue.sort( (a,b) =>{ a.id - b.id } );

  let watcher,id;
  for(index = 0; i < queue.length; i++){
    watcher = queue[i];

    id = watcher.id;

    has[id] = null; // 执行完 释放?

    watcher.run(); //核心放
  }

  // 状态归零

  // 组件更新
}


// 组件的执行逻辑: 初始化/更新逻辑
new Wacther(vm , updateComponent, noop,{ before(){}});

// updateComponent 为回调函数 当数据发生变化时 会触发该回调

updateComponent = () =>{
  vm._update(vm._render(),hydrating);
}

// 接下来执行_update方法
Vue.prototype._update = function(vnode,hydrating){
  const vm = this;
  const prevVnode = vm._vnode;
  if(!prevVnode){
    // 初始化 走的逻辑
    vm.$el = vm.__patch__(vm.$el,vnode,hydrating,false);
  }else{
    // 新旧节点比对的逻辑
    vm.$el = vm.__patch__(prevVnode,vnode);
  }
}

// 最终会执行 __patch__逻辑



// patch的大致逻辑
function patch(oldVnode,vNode,hydrating,removeOnly){
  // 情形1: 新节点不存在 老节点存在 -> 销毁老节点
  if(isUndef(vNode)){
    if(isDef(oldVnode))  destoryVNode();
    return;
  }

  // 情形2: 老节点不存在 新节点存在 -> 创建新节点
  if(isUndef( oldVnode)){
    createElm(vnode, insertedVnodeQueue) 
  }else{
    const isRealElemt;

    // 情况3: 节点相同 -> 更新节点
    if(!isRealElemt && SameVnode()){
      patchVNode();
    }
    // 情况4: 节点不同 -> 新增新节点 销毁老节点
    else{
      // 创建新节点
      createElm(vnode); 
      
      // 更新父占位符

      // 删除老节点
      destoryOldNode();
    }
  }
}

function patchVNode(oldVnode,vnode){

  // some code 

  // Step 1: 执行prepatch函数
  let i;
  const data = vnode.data;
  if( isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)){
    i(oldVnode,vnode);
  }
}

// Step 1: 执行prepatch函数
let i;
const data = vnode.data;
if( isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)){
  i(oldVnode,vnode);
}

// src/core/vdom/create-component.js
function prepatch(oldVnode,vnode){
  const options = vnode.componentOptions;
  const child = vnode.componentInstance = oldVnode.componentInstance;
  // 更新组件配置
  updateComponent()
}

// src/core/instance/lifecycle.js
// 更新一系列组件的配置项
function updateComponent(){
  vm.$options.arrtr = attr;
  // here are some code
}



const oldVnode = [ { tag:1,idx:1},{tag:2,idx:2},{tag:3,idx:3 },{tag:4 ,idx:4} ]
const newVnode = [ { tag:4,idx:4},{tag:3,idx:3},{tag:2,idx:2 },{tag:1 ,idx:1},{ tag:5,idx:5 }];

// 更新子节点
function updateChildren( oldVnode,newVnode ){
  // 定义指针位置和相对应的特殊位置节点
  let oldStartIdx = 0;
  let newStartIdx = 0;

  let newEndIdx = newVnode.length - 1;
  let oldEndIdx = oldVnode.length - 1;

  let oldStartNode = oldVnode[0];
  let oldEndNode = oldVnode[];

  let newStartNode = newVnode[0]
  let newEndNode = newVnode[];

  // 在旧的子节点列表中寻找本次循环所指向的新子节点 
  while( oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx ){

  // 遍历新的子节点列表 -> 在旧的子节点列表中比对
  
  // 如果节点相同 位置相同 数据不同 -> 更新操作
  // 如果节点相同 位置不同 数据不同 -> 移动操作
  // 如果节点不同 -> 新增操作
  // 新节点列表中不存在 -> 删除旧节点操作
  }
}


doSomething( function(v){
  console.log(`got a value ${v}`)
} )

doSomething.then(  v =>{
  console.log(`got a value ${v}`)
})

function doSomething(){
  return {
    then: function(cb){
      var v = 42;
      cb(v);
    }
  }
}


