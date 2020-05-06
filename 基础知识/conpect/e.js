
// 2019-08-12 实现一个深拷贝

function isType(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
}

let isObject = isType("Object");
let isArray = isType("Array");
let isFunction = isType("Function");
let isObjectGenerally = function(obj) {
  return typeof obj === "object" && obj != null;
};

function isPrimiateAndFn(obj) {
  return (
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "symbol" ||
    typeof obj === "boolean" ||
    typeof obj === "function"
  );
}

function isUndefine(obj) {
  return obj === null || typeof obj === "undefined";
}

// 实现一个深拷贝

// 如何避免爆栈
function deepClonePlus(source, hash = new WeakMap()) {
  // 对数据类型的处理
  if (source === null) return null;
  if (isPrimiateAndFn(source)) return source;
  if (typeof source === "undefined") {
    throw new Error("can not convert undefined to clone");
  }
  console.log("hash", hash);
  if (hash.has(source)) return hash.get(source);
  let target = isArray(source) ? [] : {};
  hash.set(source, target);
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObjectGenerally(source[key])) {
        target[key] = deepClonePlus(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// 2019-08-12 Vue源码:optimize

function optimize(element, options) {
  markStatic(); // 标记静态节点
  markStaticRoots(); // 标记静态根
}

function markStatic(node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // 避免在插槽中放置静态内容
    for (let i = 0, l = node.child.length; i < l; i++) {
      const child = node.child[i];
      markStatic(child);
      if (!child.static) {
        node.static = false;
      }
    }

    if (node.ifCondition) {
      for (let i = 0, l = node.ifCondition.length; i < l; i++) {
        const block = node.ifCondition[i].block;
        markStatic(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function isStatic(node) {
  if (node.type === 2) return false; // 表达式 => 非静态节点
  if (node.type === 3) return true; // 纯文本 => 静态节点

  return !!(
    node.pre || // 普通元素有pre指令  => 静态节点
    (!node.hasBindings && // 拥有指令
    !node.if && // v-if指令
    !node.for && // v-for指令
    !isBuildInTag(node.tag) && // 平台内置标签
    isPlatformReservedTag(node.tag) && // 平台保留标签
    !isDirectChildOfTemplateFor(node) && // 带有v-for的template标签子节点
      Object.keys(node).every(isStaticKey))
  ); // 节点所有属性的key是否满足静态key
}

// 2019-08013 Vue源码:optimize
function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }

    if (
      node.static && // 静态节点
      node.child.length && // 拥有子节点
      !!(node.child.length === 1 && node.child[0].type === 3) // 子节点不能是文本类型
    ) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }

    if (node.child) {
      for (let i = 0, l = node.child.length; i < l; i++) {
        markStaticRoots(node.child[i], isInFor || node.for);
      }
    }

    if (node.ifCondition) {
      for (let i = 0, l = node.ifCondition.length; i < l; i++) {
        markStaticRoots(node.ifCondition[i].block, isInFor);
      }
    }
  }
}

// loadsh是如何实现深拷贝的
const CLONE_DEEP_FLAG = 1;
const CLONE_FLAT_FLAG = 2;
const CLONE_SYMBOLS_FLAG = 4;

function cloneDeep(value) {
  // 参数1:需要传入的对象 参数2:位掩码(什么是位掩码)
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

function baseClone(value, bitmask, customizer, key, object, stack) {
  // value 需要拷贝的对象
  // bitmask 位掩码
  // custimizer 定制的clone函数
  // key 传入的value值的key
  // objcet 传入的value值的父对象
  // stack 栈  用来处理循环引用
  let result;

  // 标志位
  const isDeep = bitmask & CLONE_DEEP_FLAG;
  const isFlat = bitmask & CLONE_FLAT_FLAG;
  const isFull = bitmask & CLONE_SYMBOLS_FLAG;

  // 对非对象的处理
  if (!isObjectType(value)) {
    return value;
  }

  // 数组的处理
  const isArr = Array.isArray(value); // 判断是否为数组
  const hasOwnProperty = Object.prototype.hasOwnProperty;

  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArr(value, result);
    }
  } else {
  }
}

function isObjectType(value) {
  const type = typeof vlaue;
  return value !== null && (type === "object" || type === "function");
}

// 初始化克隆数组
function initCloneArray(array) {
  const { length } = array; // 从数组中读取length
  const result = new array.constructor(length); // 为什么不直接写new Array(length)呢 有点装b呢

  // 处理正则返回的数组
  if (
    length &&
    typeof array[0] === "string" &&
    hasOwnProperty.call(array, "index")
  ) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

// 2019-8-13 Vue源码:generate
const code = generate(ASTTree, options);

function generate(ast, option) {
  const state = new CodegenState(option); // 实例化CodegenState
  const code = ast ? getElement(ast, state) : '_c("div")';
  return {
    render: `with(this){return${code}}`,
    staticRenderFns: state.staticRenderFns
  };
}
function getElement(el, state) {
  if (el.staticRoot && !el.staticProcessed) return genStatic(el, state);
  if (el.once && !el.onceProcessed) return genOnce(el, state);
  if (el.for && !el.forProcessed) return genFor(el, state);
  if (el.if && !el.ifProcessed) return genIf(el, satte);
  if (el.tag === "template") return genChildren(el, state) || "void 0";
  if (el.tag === "slot") return genSlot(el, state);
  let code;
  if (el.component) code = genComponent(el.component, el, state);
  let data;
  if (el.pre || state.mayBeComponent(el)) data = genData(el, state);

  const children = el.inlienTemplate ? null : genChildren(el, state, true);

  // 生成一个字符串形式的渲染函数
  code = `-c('${el.tag}'${data ? `,${data}` : ""}${children
    ? `,${children}`
    : ""})`;
  // 使用modlue transform
  for (let i = 0; i < state.transforms.length; i++) {
    code = state.transforms[i](el, code);
  }
  return code;
}

function genIf(el, state, altGen, altEmpty) {
  el.ifProcessed = true; // 避免反复调用
  return genIfCondition(el.ifCondition, state);
}

function genIfCondition(conditions, state, altGen, altEmpty) {
  // 对conditions的长度进行判断
  if (!conditions.length) {
    return altEmpty || "_e()";
  }
  let condition = conditions.shift(); // 获取conditions中的第一个元素 破坏性的
  // 通过condition.exp获取一段三元表达式代码 如果表达式有多个 那么就获取多层的三元表达
  if (condition.exp) {
    return `(${condition.exp})?${genTernaryType(
      condition.block
    )}:${genIfCondition(conditions, state, altGen, altEmpty)}`;
  } else {
    return genTernaryType(condition.block);
  }

  function genTernaryType(el) {
    return altGen
      ? altGen(el, state)
      : el.once ? genOnce(el, state) : getElement(el, state);
  }
}

// 20190814 错误监控

// 简单的错误监控代码
let oldError = console.error;

// 重写console.error
console.error = function() {};
// 重写window.onerror
window.onerror = function() {};

// 20190814 Vue源码 v-model



function genData(el, state) {
  const dir = genDirective(el, state); // 获取到该节点中的所有指令
}

function genDirectives(el, state) {
  const dirs = el.directives;
  if (!dirs) return;
  const res = "directives:[";
  let hasRunTime = false;
  let i, l, needRuntime, dir;

  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;

    const gen = state.directives(dir.name);


    if (gen) {
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRunTime = true;
      // 遍历该节点上的指令 拼成一个字符串
      res += ``;
    }
  }

  if (hasRunTime) {
    return res.slice(0, -1) + "]";
  }
}

function model(el,dir,_warn){
  const value = dir.value;
  const modifiers = dir.modifiers;
  const tag = el.tag;
  const type = el.attrsMap.type;

  // 禁止给文件上传绑定变量


  // 会根据表单的类型做不同处理
  if(el.component) genComponent(el,value,modifiers);
  if(el.tag === 'selct') genSelect(el,value,modifiers); // selcet类型
  if(el.tag === 'input' && el.type === 'checkbox') genCheckBoxModel(el,value,modifiers); // checkbox类型
  if(el.tag === 'input' && el.type === 'radio') genRadioModle(el,value,modifiers); // radio类型
  if(el.tag === 'input' || el.tag === 'textarea') genDefaultModel(el,value,model); // 默认的input类型
  if( !config.isReservedTag(el.tag)){ // 组件标签
    genComponentModel(el,value,modifiers);
    return false;
  }
  // 如果以上都不是，会抛出一个警告
  return true;
}



function genDefaultMoel(el,value,modifiers){
  const type = el.attrsMap.type;

  // 解决v-model 与 v-bind:value的冲突

  const { lazy,number,trim } = modifiers || {};
  const needCompositionGurad = !lazy && type !== 'range'
  const event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';

  let valueExpression = `$event.target.value`;
  if(trim){
    valueExpression = `$event.target.value.trim()`;
  }

  if(number){
    valueExpression = `_n(${valueExpression})`
  }

  let code = genAssignmentCode(value,valueExpression)
  
  if(needCompositionGurad){
    code = `if($event.target.composing);${code}`
  }

  addProp(el,value,`(${value})`)
  addHandler(el,event,code,null,true)

  if(number || trim){
    addHandler(el,'blur',`$forceUpdate()`)
  }
}

function genAssignmentCode(value,valueExpression){
    const res = parseModel(value);
    if(res.key === null){
      return `${value}=${valueExpression}`
    }else{
      return `$set(${res.exp},${res.key},${valueExpression})`
    }
}



function parseModel(value){
  let v = value.trim();
  let l = v.length;

  if(v.indexOf('[') < 0 || v.indexOf(']') < l - 1  ){
    index = v.lastIndexof('.');
    if(index > -1){
      return {
        exp: v.slice(0,index),
        key: v.slice(index+1)
      }
    }else{
      return {
        exp: v,
        key:null
      }
    }
  }
}


addProp(el,'value',`(${value})`);

// 添加prop属性？
// 给ast元素动态绑定prop 
function addProp(el,name,value){
  (el.props || (el.props = [])).push(rangeSetItem({name,value,dymaic},range))
  el.plain = false;
}

function rangeSetItem(item,range){
  if(range){
      if(range.start != null) item.start = range.start;
      if(range.end != null) item.edn = range.end;
  }
  return item;
}

addHandler(el,name,value,null,true);


function addHandler( el,name,value,modifiers,important){
  // 对修饰符进行非空校验
  modifiers = modifiers || emptyObject;

  // passive和prevent指令不能同时使用
  if(modifiers.prevent && modifiers.passive) warn('can not set passive and prevent at the same time'); 
  // 鼠标点击事件的处理(右键+中间键)
  if(modifiers.right){
    handlerRight()
  }else if(modifiers.middle){
    handleMiddle();
  }
  
  if(modifiers.capture) handleCapture();
  if(modifiers.once) handleOnce();

  // 开始处理事件
  let evnet;
  if(modifiers.native){
    event = el.nativeEvents || (el.nativeEvents = {})
  }else{
    event = el.event || (el.event = {})
  }

  const newHandlers;
  const handles = event[name]

}

// 20190820  Vue源码 -> 事件原理

function processAttrs(el){
  const list = el.arrtsList;
  let i, l ,name,rawName,value,modifiers,syncGen,isDaymic;
  // 遍历attrs中的属性 使用正则匹配v-bind: @event 等情况
  for(i = 0,l = list.length; i < l; i++){
    name = rawName = list[i].name;
    value = list[i].value;
    if(dirRe.test(name)){
      parseModifiers();
      parseEvnetModifiers();// 剖析事件的指令

    }else{
      // 处理其他情况的治理
    }
  }
}



const modifierRE = /\.[^.\]]+(?=[^\]]*$)/g
function parseModifiers(name){
  const match = name.match(modifierRE);
  if(match){
    const ret = {};
    match.forEach( m => {
      ret[m.slice(1)] = true
    })
    return ret;
  }
}
// 20190820  


// 20190826 Vue源码:Vue.use的实现原理

function initUser(Vue:GlobalApi){
  Vue.use = function(plugin: Object || Function  ){
    // 判断插件是否已经安装 如果安装了 那就不需要再重复
    const instaledPlugins = this.instaledPlugins || (this.instaledPlugins = []);
    if(instaledPlugins.indexOf(plugin) > -1 ){
      return this;
    }

    const p = toArray( arguments,1); // 读取use中的参数
    p.unshift(this); // 把大V对象放在第一个

    // 执行函数
    if(typeof plugin.install === 'function'){
      plugin.install.apply(this,p);
    }else if(typeof plugin === 'function'){
      plugin.apply(null,this);
    }

    // 将插件放入已安装插件列表
    instaledPlugins.push(plugin);
    return this;

  }
}




import { install } from './install.js'

export default class  vueRouter{

}

vueRouter.install = install;


// 20190826 晚上
import Views from './component/view';
import Link from './component/link';

let _Vue;

function install(Vue){
    // 对安装进行标记 为了防止重复安装
    if(install.installed && _vue === vue) return
      install.installed = true;
      _Vue = Vue;
    
    const isDef = v => v !== undefined;
    // 定义函数注册实例
    const resgisterInstance = ()=>{

    }
    // 在钩子函数中混入相应函数
    Vue.mixin({
      beforeCreated(){

      },
      destoryed(){

      }
    });

    // Vue原型上注册 $router和$route方法
    Object.defineProperty(Vue.prototype,'$router',{});
    Object.defineProperty(Vue.prototype,'$route',{});

    // 全局注册 routerview 和 routerlink组件
    Vue.component('RouterView',View);
    Vue.component('RouterLink',Link );

    // 在路由的生命周期中使用相同的合并策略
    const starts = Vue.config.optionMergeStrateiges;
    starts.beforeRouterEnter = starts.beforeRouterLeave =  starts.beforeRouterUpdate =  starts.created
}

// vue.mixin方法

function initMixin(Vue){
  Vue.mixin = function(mixin:Object){
    this.options = mergeOptions(this.options,mixins)
    return this;
  }
}

//  20190827 VueRouter

class VueRouter{
  // 定义了一系列的实例属性

  constructor(options: RouterOptions = {}){


    this.app = null; // 根Vue实例
    this.apps = [];  // 所有子组件的Vue实例
    this.options = options; // 路由配置项
    this.beforeHooks = []; // 钩子函数
    this.resolveHooks = []; // 钩子函数
    this.afterHooks = []; // 钩子函数
    this.matcher = createMatcher(options.route || [],this); // 路由匹配器

    // 对模式进行处理
    let mode = options.mode || 'hash'; // 配置项不传 就是哈希模式
    this.fallback = mode === 'history' && !supportPushState && options.fallback !== false;
    // 选择了history模式 但不支持pushState API 且 配置项中的fallback为true 那么还是hash模式
    if(this.fallback){
      mode = 'hash'
    }
    if(!inBrowser){
      mode = 'abstract';
    }
    this.mode = mode;

    switch(mode){
      case 'history':
      this.history = new HTML5History(this,options.base)
      case 'hash':
      this.history = new HashHistory(this,options.base,this.fallback);
      case 'abstract':
      this.history = new AbstractHistory(this,options.base);
      default:
        if(process.env.NODE_ENV !== 'production'){
          assert('invalid model');
        }
    }
  }
  // 定义了一系列的实例方法
  // 用来定义初始化方法
  init(app){
    // 判断是否安装
    process.env.NODE_ENV !== 'production' && assert(install.installed,'not installed message');

    this.apps.push(app); // 将根Vue放入apps属性内
    
    // 销毁
    app.$once('hook:destoryed',()=>{})
    if(this.app){
      return;
    }
    this.app = app;

    // 重点核心的流程
    const history = this.history;
    if(history instanceof HTML5History){
      history.transitionTo(history.getCurrentLocation());
    }else if(history instanceof HashHistory){
      const setupHashListner = ()=>{
        history.setupListner()
      }
      history.transitionTo(history.getCurrentLocation(), setupHashListner  ,  setupHashListner );
    }
    // 核心流程:监听
    history.listen( route =>{
      this.routes.forEach( app =>{
        app._route = route;
      })
    })
  }
}

function transitionTo( location,onComplete,onAbort){
  // 先使用match方法匹配路由
  const route = this.router.match(location,this.current);
  // 匹配的路由 回调成功函数 错误函数
  this.confirmTransition(route, ()=>{

  },err =>{

  })
}


// 2019/8/28 Vue源码
export type Matcher = {
  match : (raw:RawLocation,current ?: Location, redirectFrom ?: Location ) => Route,
  addRoutes: (routes) => void
}

// Location数据结构
declare interface Location{
  _normalized ?: Boolean,
  name ?: String,
  path ?: String,
  hash ?: String,
  query ?: String,
  parmas ?: String,
  append ?: Boolean,
  replace ?: Boolean,
}

// route数据结构
declare interface Route{}

// 20190828 晚上
function createMatcher(routes:Array<RouterConfig>,router:VueRouter){
  // 调用createRouteMap函数 然后读取pathList/pathMap/nameMap
  const {  pathList,pathMap,nameMap } = createRouteMap(routes);

  // 定义了一系列函数
  function addRoutes(){
    createRouteMap(routes,pathList,pathMap,nameMap)
  }
  function match(){}
  function redirct(){}
  function alias(){}
  function _createRoute(){}

  // 最终返回一个对象
  return {
    match,
    addRoutes
  }
}


// 20190828 p.m. 21:50


const routes = [
  { path:'/foo', component:Foo},
  { path:'/bar', component:Bar},
]



function createRouteMap(routes,oldPathList,oldPathMap,oldNameList){
  // 定义变量
  const pathList = oldPathList || [];
  const pathMap = oldPathMap || Object.create(null);
  const nameList = oldNameList || Object.create(null);

  // 对路由进行处理
  routes.forEach( route =>{
    addRouteRecord(pathList,pathMap,nameList,route);
  })

  // 对pathList的护理
  for(let i = 0, l = pathList.length; i < l; i++){
    if(pathList[i] === '*'){

    }
  }

  // 返回遍历
  return {
    pathList,
    pathMap,
    nameList
  }
}

const record: RouteRecord = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  }
{
  pathList: Array
  pathMap: Object
  nameList: Object
}


// 2019-8-29  Vue源码:Vue-router

function addRouteRecord( pathList,pathMap,nameList,route,parent,matchAs){
  const { path,name } = route; // 从单个路由配置中获取path和name变量

  // 对配置项 路径 和 组件 的校验
  if(process.env.NODE_ENV !== 'production'){
    assert( path != null, 'path config error');
    assert( typeof route.component === 'string', 'component config error');
  }

  const pathToRegexOptions = route.pathToRegexOptions || {};

  // 通过normalizedPath初始化路径
  const normalizedPath = normalizedPath(path,parent,pathToRegexOptions.strict)

  const record = {
    // 生成每一条route记录
  }// 核心代码:对一系列参数进行处理 
  
  if(route.children){}; //对子路由的处理
  if(route.alias !== undefined){} //对路由简写的处理

  // 添加路由映射表
  if(!pathMap[record.path]){
    pathList.push(record.path);
    pathMap[record.path] = path;
  }
  if(name){};//配置了name
}


// match函数大致流程

function match(raw,currentRoute,redirectFrom){
  const location = normailzeLocation(raw,currentRoute,false,route);
  const { name } = location;

  // 核心代码流程
  if(name){}else if(location.path){}

  return _createRoute(null,location);
}


function normalizeLocation(raw,current,append,router){
  let next = typeof raw === 'string' ? { path:raw } : raw;
  // 处理情况1: 没有path却有name属性
  if(!next.path && next.params && current){
      // 一系列处理代码
      return next;
  }

  // 处理情况2: 有path属性
  // 对路径的处理
  let parsedPath = paesedPath( next.path || '');
  let basePath = ( current && current.path ) || '';
  let path = paesedPath.path ? resolvedPath() : basePath;

  // 对query的处理
  let query = resolvedQuery( parsedPath.query,next.query,router.options.query);

  // 对hash的处理
  let hash = next.hash || parsedPath.hash;

  return {
    _normalized: true,
    path,
    query,
    hash,
  }
}




function _createRoutes(record,location,redirectFrom){
  if(record && record.redirect){
    return redirect( record, redirectFrom || location );
  }

  if(record && record.matchAs){
    return alias( record,location,record.matchAs )
  }

  return createRouter(record,location,redirectFrom,router);
}



function createRouter(record,location,redirectFrom,router){
  let stringfyQuery = router && router.options.stringfyQuery;
  let query = location.query ||  {}

  try{
    query = clone(query);
  }catch(e){}

  let route = {
    name,
    meta,
    path,
    hash,
    query,
    params,
    fullPath,
    matched
  }
  return Object.freeze(route)
}


History.prototype.transitionTo = function( location,onComplete,onAbort){
  let this$1 = this;

  let route = this.$router.match(location,this.current);

  this.comfirmTransition( route, function(){},  function(err){
    
  })
}

runQueue( queue,iterator, ()=>{
  const postEnterCbs = [];
  const isValid = ()=> this.current === route;
  const enterGuards = extractEnterGuards(actived,postEnterCbs,isValid)

  const queue =  enterGuards.concat(this.router.resolveHooks);
  runQueue( queue, iterator, ()=>{
    if(this.pending !== route){
      return abort()
    }

    this.pending = null;
    onComplete(route);
    if(this.router.app){
      postEnterCbs.forEach( cb => { cb() } )
    }
  })
})


function extractEnterGuards( activated,cbs,isValid){
  return extractGuards( activated,'beforRouteEnter', ( guard,_,match,key)=>{
    return bindEnterGuard(  guard,match,key,cbs,isValid)
  })
}

function bindEnterGuard(guard,match,key,cbs,isValid){
  return function routeEnterGuard( to,from,next ){
    return guard(to,from, ()=>{
      next(cb);
      if(typeof cb === 'function'){
        cbs.push( ()=>{
          poll(cb,match.instances,key,isValid);
        } )
      }
    } )
  }
}


import { Store, install } from './store'
import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'

export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}



// export function install (_Vue) {
//   if (Vue && _Vue === Vue) {
//     if (process.env.NODE_ENV !== 'production') {
//       console.error(
//         '[vuex] already installed. Vue.use(Vuex) should be called only once.'
//       )
//     }
//     return
//   }
//   Vue = _Vue
//   applyMixin(Vue)
// }



function install(_Vue){
  if(Vue && _Vue === Vue){
    Warn(`Vuex has already installed`);
    return 
  }
  Vue = _Vue;
  applyMixin(Vue);
}


// vueX的初始化
function applyMixin(Vue){
  // 获取Vue的版本
  const version = Vue.version.split('.')[0];

  // 使用mixin方法 在 beforeCreate钩子函数上混入vuexInit方法
  if(version >= 2){
    Vue.mixin( { beforeCreate:vuexInit} )  
  }else{
    // 给vue2.x版本以下做兼容
  }

  // vuex的初始化钩子 
  // 将注入每一个Vue实例中
  function vuexInit(){
    const options = this.$options;

    if(options.store){
      this.$store = typeof options.store === 'function' ?
      options.store() : options.store;
    }else if(options.parent && options.parent.$store){
      this.$store = options.parent.$store;
    }
  }
}


class store{
  constructor(options = {}){
    // ingore
    
    this.module = new ModuleCollection(options);

    const state = this._modules.root.state
    installModule(this, state, [], this._modules.root)

    // ingore 
  }
}


function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length


  const namespace = store._modules.getNamespace(path)

  // register in namespace map

  if (module.namespaced) {
    // 去重校验
    if (store._modulesNamespaceMap[namespace] && process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`)
    }
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state)
    })
  }

  
  
  const local = module.context = makeLocalContext(store, namespace, path)



  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}



function getNamespace(path){
  let module = this.root // 根节点
  return path.reduce((namespace, key) => {
    module = module.getChild(key) 
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
}



function installModule( store, rootStates,path,module,hot ){
  const isRoot = !path.length;
  const namespace = store._modules.getNamespace(path);

  if(module.namespaced){} // 处理命名空间
  if(!isRoot && !hot ){ } // 处理state

  module.forEachMutation( (mutation,key)=>{})
  module.forEachAction(  (action,key)=>{})
  module.forEachGetter( (getter,key) =>{})
  module.forEachChild(  (child,key)=>{})
}




class ModuleCollection{
  constructor(rawRootModule){
    this.register([],rawRootModule,false);
  }


  get(path){
    return path.reduce(  (module,key) =>{
      return module.getChild(key)
    },this.root);
  }

  register(path,rawModule,runtime = true ){
    if(process.env.NODE_ENV !== 'production'){
      assertRawModule(path,rawModule);
    }

    const newModule = new Module(rawModule,runtime);
    if(path.length === 0){
      this.root = newModule;
    }else{

      const parent = this.get(path.slice(0,-1));
      parent.addChild(path[path.length - 1],newModule )

    }

    if(rawModule.modules){
      forEachValue( rawModule.modules,( rawChildModule,key )=>{
        this.register(path.concat(0,-1),rawChildModule);
      })
    }


  }
}

class Module{
  constructor(rawModule,runtime){
    this.runtime = runtime;
    this._children = Object.create(null); // 该模块的子模块
    this._rawModule = rawModule; // 模块配置
    const state = rawModule.state;  
    this.state = typeof state === 'function' ? state() : state; // 模块的state
  }

  getChild(key){
    return this._children[key];
  }
}



const newModule =  {
  _rawModule:Object,
  runtime: Boolean,
  _children:Object,
  state: Object
}

function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  
  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}

function makeLocalContext (store, namespace, path){
  const noNamespace = namespace === '';


  const local = {
    dispatch: noNamespace ? store.dispatch : (_type,_payload,_options )=>{
      const args = unifyObjectStype(_type,_payload,_options); // 对参数进行处理
      const { payload, options } = args;
      let { type } = args;

      return store.dispatch( type,payload,options )

    },

    commit:  noNamespace ? store.commit :  ( _type,_payload,_options )=>{
      const args = unifyObjectStype(_type,_payload,_options); // 对参数进行处理
      const { payload, options } = args;
      let { type } = args;

      store.commit( type,payload,options);
    }
  }

  Object.defineProperties(local,{
    getters:{},
    state:{},
  })

  return local;
}


function getNestedState(state,path){
  return path.length ? path.reduce( (state,key) => state[key] , state ) : state;
}




module.forEachMutation((mutation,key)=>{
  const namespacedType = namespace + key; // 获取namespace空间名
  registerMutation( store,namespacedType,mutation,local);
})

// 获取store对象中相应的_muation值
function registerMutation(store,type,handler,local){
  const entry = store._mutaion[type] || (store._mutaion = []);
  enrty.push(function wrapperMutaionHandler(playload){
    handler.call(store,local,state,playload);
  })
}



model.forEachAction(( action,key )=>{
  const type = action.root ? key : namespace + key; 
  const handler = action.handler || action;

  registerAction( store,type,handler,local);
})


// 注册action
function registerAction( store,type,handler,local){
  const entry = store._action[type] || (  store._action[type] = []);

  entry.push(function wrapperActionHnadler( playload ){
    // 执行action函数
    let res = handler.call(store,{
      dispatch:local.dispatch,
      commit: local.commit,
      getters: local.getters,
      rootGetters: store.getters,
      rootState: store.state,
    },playload,cb)

    // 对执行的结果进行分析
    // [1]. 是不是Promise对象
    if(!isPromise(res)){
      res = Promise.resolve(res)
    }

    // [2].是否有错误
    if(store._devtoolHook){
      return res.catch(  err =>{
        store._devtoolHook.emit(`vuex error`,err)
        throw error
      } )
    }else{
      return res;
    }
  })
}



module.forEachGetter(  ( getter,key)=>{
  const namespacedType = namespace + key;
  registerGetter( store, namespacedType,getter,local);
} )



function registerGetter(store,type,getter,local ){
  // 重复性校验
  if(store._warppedGetters[type]){
    if(process.env.NODE_ENV !== 'production'){
      console.error('duplicate getters')
    }
    return;
  }
  // 将函数存入store中的store相应属性内
  store._warppedGetters[type] = function wrappedGetter(){
    return rawGetter(
      local.state,
      local.getter,
      store.state,
      store.getter
    );
  }
}


resetStoreVM(this,vm);



function resetStoreVM(store,state,hot){
  const oldVM = store._vm; // 首先出去store._vm 

  store.getters = {};
  const wrappedGetters = store._warppedGetters; // 在vueX中定义的getter
  const computed = {};

  // 绑定store公共的值  
  forEachValue(wrappedGetters, (fn,key)=>{
      computed[key] = () => fn(store);

      Object.defineProperty(store.getters,key, {
        get: () => store._vm[key],
        enumerable: true,
      })
  });


  // 实例化vue对象
  const slient = Vue.config.slient;
  Vue.config.slient = true;

  store._vm = new Vue( {
    data:{
      $$satte: state // 对state进行响应式
    },
    computed
  })
  Vue.config.slient = slient;

  // 如果有严格模式
  if(store.strict){}

  // 如果存在旧的vm实例
  if(oldVm){
    // 如果热更新
    if(hot){}
    // 使用nextThick进行销毁
    Vue.$nextThick(  ()=>{  
      oldVM.$destory();
     })
  }
}





const vm1 = new Vue({
  props:['name','list']
})

// 返回结果
res = { name:{  type:null}, list:{ type:null} }

const vm2 = new Vue({
  props:{ name:String, list: Number  }
})

// 返回结果
res = {  name:{  type:String},list:{ type:String } }

const vm3 = new Vue({
  props :{
    name:{
      default:'laowang',
      type: String,
    },
    list:{
      default:1,
      type:Number
    }
  }
})

// 返回结果
res = {  name: { default:'laowang',type: String  },list:{ default:1, type:Number}}

// 最后
vm.$options.props = res;


// 数组配置
const child1 = {
  provide:{
    foo:'bar'
  },
  inject:['foo']
}

// 处理结果
normalized = { 'foo': { from: 'foo' }}

// 对象配置
const child2 = {
  provide:{
    foo:'bar',
  },
  inject:{
    bar:{
      from:'foo',
      default:[1,2,3]
    }
  }
}

normalized = { 'bar':  { from:'foo',default:'not bar' }}



// 这里指的是局部注册的指令
// 按照下面的例子 编译时会生成一个v-focus指令

const vm = {
  directives:{
    focus:{
      // 对象形式配置
      inserted:function(){
      }
    }
  }
}

options.directives = { 'focus': { inserted: function(){}}}

const vm = {
  directives:{
    // 函数形式配置
    focus:function(){}
  }
}

options.directives = { 'focus': { bind:function(){},update:function(){} }  }












module.forEachModule( (child,key)=>{
  installModule(store,rootState,path.concat(key),child,hot);
})



 















