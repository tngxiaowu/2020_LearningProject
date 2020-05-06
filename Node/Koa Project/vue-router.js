// 简单版本 
export default class VueRouter {
  constructor(routers) {
    this.routers = routers;
    this.history = new History();
    this.history.listen(( path)  => {
        this.path = path; // 每次变化后收到的path
        this.vm.$forceUpdate();
    });
  }

  init(vm){
      this.vm = vm;
  }
}

class History {
  listen(callback) {
    window.addEventListener("haschange", () => {
      console.log("window hash change", window.location.hash);
      callback && callback(window.location.hash);
    });
  }
}

VueRouter.install = function(Vue) {
  Vue.mixin({
    beforeCreate() {
        if(this.$options.router){
            this.$options.router.init(this)
        }
    }
  });


  Vue.component("router-vue", {
    functional: true,
    render(h, { props,children,parent,data }) {
      const  router = parent.$options.router;
      const path = router.path;
      // 对pacth的处理
      const matchedRouter = router.routes.find(route => { return route.path.replace(/^\//,'') === path.replace(/^#\//,'')}) 

      const matchedComponent = matchedRouter.component 
      return h("div", {});
    }
  });
};
