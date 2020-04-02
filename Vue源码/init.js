// Vue 2.0 初始化流程
// 语法部分
import Vue from "vue";
import App from "./App";

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
});

// 源码部分
function Vue(options) {
  // .......
  this._init(options);
}

// Step 1:初始化
Vue.prototype._init = function(options) {
  const vm = this;
  if (options.isComponent) {
    initInternalCompent(); // 组件入口
  } else {
    vm.options = mergeOptions(); // 根节点合并配置项
  }
  // (在完成配置项初始化后)初始化一系列事件
  initEvents();
  
  callHook();

  // 根节点入口
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};

// Step 2: 节点挂载
Vue.prototype.$mount = function(el, dryating) {
  el && query(el);
  // el挂载点检查
  const options = this.$options;
  
  // 生成render函数
  if (!options.render) {
    // 有两种情形
    // template语法

    // 编译
    const { render, staticRenderFn } = compileToFunctions();

    // 编译输出 挂载到options上
    options.render = render;
    options.staticRenderFn = staticRenderFn;
  }

  return mount.call(this, el, dryating);
};

// const mount = Vue.prototype.$mount;
function mount(vm, el, dryating) {
  el = el && inBroeser ? query(el) : undefined;
  return mountComponent(this, el, dryating);
}

function mountComponent(vm, el, dryating) {
  vm.$el = el; // 挂载点

  let updateComponent;

  // Step 3: 渲染节点
  updateComponent = () => {
    vm._update(vm._render(), hydrating); // 渲染节点
  };

  // Step 4: 数据监听
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {}
    },
    true
  );

  return vm;
}

// 3.0 初始化流程
const { createApp, reactive, onMounted } = Vue
const state = reactive({ text: 'hello world!' })
const App = {
    setup () {
        onMounted(() => {
            console.log('onMounted: hello world!')
        })
        return { state }
    }
}

createApp().mount(App, '#app')

/************************ 详细代码执行部分  ********************************/
// 源码执行部分
// 创建并返回一个app对象
// runtime-dom -> src -> index.ts

// Step 1 : createApp
function createApp(...args){
  const app = baseCreateAPP(...args);
  const { mount } = app;
  app.mount =  (container) =>{
    if(isString(container)){
      container = document.querySelector(container);
    }
    const component = app._component;
    // 处理组件上的一些逻辑
    container.innerHtml = '';
    return mount(container);
  };
  return app;
}

// Step 2:  createRender ->  baseCreateAPP
const {  render:baseRender, createApp:baseCreateAPP  } = createRender( {
  patchProp,
  ...nodeOps,
});

// runtime-core -> src -> render.ts
function createRender(options){
  const { 
    insert: hostInsert
  } = options;

  // 一系列Function
  // patch方法就是最终的比较
  function patch(){}

  function processText(){}

  // Some Other Codes
  const render = (vnode,container) =>{
    if(vnode == null){
      if(container._vnode){
        unmount( container._vnode,null,null,true);
      }
    }else{
      patch(container._vnode || null,vnode,container  )
    }

    flushPostFlushCbs();
    container._vnode = vnode;
  }

  return {
    render,
    createApp: createAppAPI(render)
  }
}

// Step 3: createApp -> createAppAPI
// runtime-core / apiCreateApp
function createAppAPI( render ){
  return function( rootComponent, rootProps = null ){
    const context = createAppContext(); //创建app执行上下文
    const installedPlugins = new Set(); // 安装插件

    let isMounted = false; // 标记位 判断是否加载载
    // 定义一个app对象
    const app = {
      _component,
      _props,
      _container,

      get config(){
        return context.config;
      },
      set config(){
        if(__DEV__){

        }
        
      },

      use(){

      },

      mixin(){

      },

      component(){

      },

      directive(){

      },
      // 用到了render方法
      mount( rootConstainer ){
        if(!isMounted){
          // 创建节点
          // createVNode也是个核心方法
          const vnode = createVNode( rootComponent,rootProps );
          vnode.appContext = context;

          if(__BUNDLE__ && __DEV__){

          }
          // 渲染
          render(vnode,rootConstainer); // 渲染

          isMounted = true;
          app._container = rootConstainer;

          // 所以 这个对象到底是什么?
          return vnode.componnet.proxy;
        } 

      },
      // 用到了render方法
      unmount(){
      },
      provide(){

      }

    };
    return app;
  }
}
// 至此返回一个app对象

/**  mount方法 ****/
// Step 4: app.mount();
// 重写的mount方法
app.mount = (container) => {
  if(isString(container)){
    container = document.querySelector(container);
  }
  const component = app._component;
  // 处理组件上的一些逻辑
  container.innerHtml = '';
  return mount(container);
};

// 原生mount方法
function mount( rootConstainer ){
  if(!isMounted){
    // 创建节点
    // createVNode也是个核心方法
    const vnode = createVNode( rootComponent,rootProps );
    vnode.appContext = context;

    if(__BUNDLE__ && __DEV__){

    }
    // 渲染
    render(vnode,rootConstainer); // 渲染

    isMounted = true;
    app._container = rootConstainer;

    // 所以 这个对象到底是什么?
    return vnode.componnet.proxy;
  } 

}

// runtime-core / src / vnode.ts
function createVNode( type,props,children,patchFlag,dynamicProps){
  // 将vnode类型信息编译成bitmap
  const shapeFlag;
  const vnode = {

  }

  normalizeChildren( vnode,children);
  return vnode;
}


/**  render方法 ****/
const render = (vnode,container) =>{
  if(vnode == null){
    if(container._vnode){
      unmount( container._vnode,null,null,true);
    }
  }else{
    patch(container._vnode || null,vnode,container  )
  }

  flushPostFlushCbs();
  container._vnode = vnode;
}

/**  patch方法 ****/



