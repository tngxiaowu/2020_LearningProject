// Vue 注册机制
function initUse(Vue) {
    Vue.use = function(plugin) {
  
      // 缓存处理
      const plugins = this._installedPlugins || (this._installedPlugins = []);
      if (plugins.indexOf(plugin) > -1) {
        return this;
      }
  
      // 参数优化 将Vue对象放到第一个
      const args = toArray(arguments, 1);
      args.unshift(this);
  
      // 执行插件
      if (typeof plugin.installed === "function") {
        plugin.installed.apply(plugin, args);
      } else if (typeof plugin === "function") {
        plugin.apply(null, args);
      }
  
      // 将插件放入
      plugins.push(plugin);
  
      return this;
    };
}


// Vue-router安装

import View from "./View";
import Link from "./Link";

let _Vue;
function install(Vue) {
  // 校验是否安装
  if (install._installed && _Vue === Vue) return;

  // 打上标签
  install._installed = true;
  _Vue = Vue;

  // 核心步骤
  // 使用mixin方法 将相关钩子函数上的事件注册到每一个组件中
  Vue.mixin({
    beforeCreated() {},
    destoryed() {}
  });

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoor._router;
    }
  });
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoor._route;
    }
  });

  // 注册组件
  Vue.component("RouterView", View);
  Vue.component("RouterLink", Link);

  // 将路由的合并策略设置为与普通钩子函数相同
  const strats = Vue.config.optionMergeStrategies
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.createdF
}

// Vue-mixin原理
Vue.mixin = function(mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };


  // 初始化Vue-router
    // 初始化实例上的一些属性
    this.app = null // 根Vue实例
    this.apps = [] // 所有子组件的实例
    this.options = options // 路由配置项
    this.beforeHooks = []  // 钩子函数
    this.resolveHooks = [] // 钩子函数
    this.afterHooks = [] // 钩子函数
    
    // matcher 适配器
    this.matcher = createMatcher(options.routes || [], this)
  
    // mode初始化
    let mode = options.mode || 'hash'
    // 路由创建失败的回调
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode
  
    // 根据配置的路由模式 初始化不同的history类
    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }

