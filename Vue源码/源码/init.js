// 3.0 初始化流程

// Vue 3.0初始化写法
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
// 输入 ->
// 输出 ->
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
  function patch(){
    // 不相同节点的情况下
    if( n1 != null && !isSameVNodeType(n1,n2)){
      unmount();
    }
    const { type, shapeFlag } = n2;
    // 节点相同
    switch(type){
      case Text:
        processText();
        break;
      case Comment:
        processComment();
        break;
      case Fragment:
        processFragment();
        break;
      case Portal:
        processPortal();
        break;
      default:
        if( shapeFlag && shapeFlag.ELEMENT ){
          processElement();
        }else if( shapeFlag && shapeFlag.COMPONENT ){
          processComponent();
        }else if(  __FEATYRE__ && shapeFlag ){
          process();
        }else if( __DEV__ ){
          warn();
        }
    }
  }

  // Some Other Codes

  // 这里定义了render函数
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
// runtime-core -> src -> render.ts
function patch(){
  // 不相同节点的情况下
  if( n1 != null && !isSameVNodeType(n1,n2)){
    unmount();
  }
  const { type, shapeFlag } = n2;
  // 节点相同
  switch(type){
    case Text:
      processText();
      break;
    case Comment:
      processComment();
      break;
    case Fragment:
      processFragment();
      break;
    case Portal:
      processPortal();
      break;
    default:
      if( shapeFlag && shapeFlag.ELEMENT ){
        processElement();
      }else if( shapeFlag && shapeFlag.COMPONENT ){
        processComponent();
      }else if(  __FEATYRE__ && shapeFlag ){
        process();
      }else if( __DEV__ ){
        warn();
      }
  }
}


// runtime-core -> src -> render.ts
function processComponent( n1,n2,container,anchor,parentComponent,parentSuspense,isSVG,optimize ){
  if(n1 == null ){
    // Keep-Alive逻辑
    if(ShapeFlags.COMPONNET_KEPT_ALIVE){

    }else{
      mountComponent( n2,container, anchor,parentComponent,parentSuspense, isSVG);
    }
  }else{
    const instance = (n2.component = n1.component)!

    if(shouldUpdateComponent(n1,n2,parentComponent,optimize)){
      if(instance.asyncDep){
        updateComponentPreRender();    
      }else{
        instance.next = n2;
        instance.update();
      }
    
    }else{
      n2.component = n1.component;
      n2.el = n1.el;
    }
  }

  if(n2.ref !== null && parentComponent !== null){
    setRef();
  }
}

function mountComponent( initialVNode,container,anchor,parentComponent,parentSuspense,isSVG ){
  const instance = createComponentInstance();
  if(__DEV__){};
  setupComponent(instance, parentSuspense)
}

// runtime-core -> src ->  component.ts 
// 接受的参数有vnode数据结构 以及父节点
function createComponentInstance( vnode, parent ){
  const appContext =  (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    parent,
    vnode,
    appContext,
    ...OtherParams // 其余参数
  };
  instance.root = parent ? parent.root : instance;
  return instance; // 返回的是一个ComponentInternalInstance(组件内部实例)
}

// 
function setupComponent(instance,parentComponent){
  const propsOptions = instance.type.props;
  const { props,children,shapeFlag } = instance.vnode;

  resolveProps();
  resolveSlots();

  if(shapeFlag && shapeFlag.STATEFUL_COMPONENT){
    setupStatefulComponent();
  }
}

function setupStatefulComponent(){
  
}










