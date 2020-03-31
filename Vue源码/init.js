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


// 源码执行部分

// 创建并返回一个app对象
function createApp(...args){
  const app = baseCreateAPP(...args);

  const { mount } = app;

  app.mount =  () =>{

  };

  return app;
}

const {  render:baseRender, createApp:baseCreateAPP  }  =
createRender( {
  patchProp,
  ...nodeOps,
} )



function createRender(options){
  const { 
    insert: hostInsert
  } = options;

  // 一系列Function
  function patch(){}

  function processText(){}

  // someOther
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


function createAppApi( render ){
  return function( rootComponent, rootProps = null ){

    const context = createAppContext(); //创建app执行上下文

    const installedPlugins = new Set();

  }


  return app;
}




function baseCreateAPP( options ){

}



