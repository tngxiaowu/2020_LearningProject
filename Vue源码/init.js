// Vue初始化流程
function Vue(options) {
  // some other code
  this._init(options);
}

// Step 1:初始化
Vue.prototype._init = function(options) {
  const vm = this;

  if (options.isComponent) {
    initInternalCompent(); // 组件入口
  } else {
    vm.options = mergeOptions();
  }
  // 初始化一系列事件
  initEvents();
  callHook();

  // 根节点入口
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};

// 节点挂载
Vue.prototype.$mount = function(el, dryating) {
  el && query(el);
  // el挂载点检查
  const options = this.$options;
  if (!options.render) {
    // 有两种情形
    // template语法

    // 模板语法
    const { render, staticRenderFn } = compileToFunctions();

    // 这也是编译的输出
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

  // 渲染节点
  updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  // 数据监听
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
