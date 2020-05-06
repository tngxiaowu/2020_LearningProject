// 20190903

History.prototype.transitionTo = function(location, onComplete, onAbort) {
  // 匹配到的路径
  let route = this.$router.match(location, this.current);
  // 执行路径切换方法
  this.comfirmTransition(route, function() {}, function(err) {});
};

// 路由切换

History.prototype.confirmTransition = function confirmTransition(
  route,
  onComplete,
  onAbort
) {
  let this$1 = this;
  let current = this.current; // 获取当前路径

  let abort = function() {}; // 定义abort函数
  if (isSameRoute()) {
  }

  let ref = resolveQueue(this.current.matched, route.matched);
  let updated = ref.updated;
  let deactivated = ref.deactivated;
  let activated = ref.activated;

  let queue = [].concat();
  let iterator = function(hook, next) {};

  runQueue(queue, iterator, function() {});
};

function runQueue(queue, fn, cb) {
  let step = function(index) {
    if (index > queue.length) {
      cb(); // 最后执行的是cb
    } else {
      if (queue[index]) {
        // 如果队列中函数存在
        fn(queue[index], function() {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

//  <---- 20190904 ---->

// 函数迭代器
// 传入一个hook函数 和 next 函数
function iterator(hook, next) {
  if (this.pending !== route) {
    return abort();
  }

  try {
    hook(current, route, function(to) {
      if (to === false || isError(to)) {
        this$1.ensureURL(ture);
        abort(to);
      } else if (
        typeof to === "srting" ||
        (typeof to === "object" &&
          (typeof to.path === "string" || typeof to.name === "srtig"))
      ) {
        abort();
        if (typeof to === "object" && to.replace) {
          this$1.replace(to);
        } else {
          this$1.push(to);
        }
      } else {
        next(to);
      }
    });
  } catch (e) {
    abort(e);
  }
}

let queue = [].concat(
  // in-component leave guards
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(function(m) {
    return m.beforeEnter;
  }),
  // async components
  resolveAsyncComponents(activated)
);

function extractGuards(recoed, name, bind, reverse) {
  let gurads = flatMapComponent(records, function(
    def,
    instance,
    match,
    key
  ) {});
  return flattern(reverse ? gurads.reverse() : gurads);
}

// 用于数组的合并

function flattern(arr) {
  return Array.prototype.concat.apply([], arr);
}

function flatMapComponent(matched, fn) {
  let arr = matched.map(m => {
    return Object.keys(m.components).map(key => {
      return fn(m.components[key], m.instance[key], m, key);
    });
  });
  return flattern(arr);
}

let defaultFn = function(def, instance, match, key) {
  var guard = extractGuard(def, name);
  if (guard) {
    return Array.isArray(guard)
      ? guard.map(function(guard) {
          return bind(guard, instance, match, key);
        })
      : bind(guard, instance, match, key);
  }
};

function extractGuard(def, key) {
  if (typeof def !== "function") {
    def = _vue.extned(def);
  }
  return def.options[key];
}

function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
}

function registerHook(list, fn) {
  list.push(fn);
  return () => {
    let index = list.indexOf(fn);
    if (index > -1) list.splice(index, 1);
  };
}

actived.map(m => {
  return m.beforeEnter;
});

function resolveAsyncComponents(matcher) {
  return function(to, form, next) {
    // 定义一系列变量
    let hasAsync = false;
    let pending = 0;
    let err = null;

    // 调用flatMapComponent
    flatMapComponent(matcher, fn);

    if (!hasAsync) {
      next();
    }
  };
}

function fn(def, _, match, key) {
  if (typeof def === "function" && def.cid === undefined) {
    hasAsync = true;
    pending++;

    // 这里是典型的异步函数的写法
    let resolve = Once();
    let reject = Once();

    let res;

    try {
      res = def(resolve, reject);
    } catch (e) {
      reject(e);
    }

    if (res) {
      if (typeof res.then === "function") {
        res.then(resolve, reject);
      } else {
        let comp = res.component;
        if (comp && typeof comp.then === "function") {
          comp.then(resolve, reject);
        }
      }
    }
  }
}

// vNode是对真实DOM的描述
// 比如说 我们可以这样描述一个div

const elementVNode = {
  tag: "div"
};

// 除了vNode之外，我们还需要一个渲染器(Render)
// 渲染的节点 和 需要渲染的位置

render(elementVNode, document.getElementById("app"));

// 这个对于普通的html标签来说 除了svg 就已经够用了
// 但是有一个问题 如何表示 组件？
function render(vNode, el) {
  const tag = document.createElement(vNode.tag);
  el.appendChild(tag);
}

class MyComponent {
  render() {
    return {
      tag: "div"
    };
  }
}

const component = {
  tag: MyComponent
};

function mountElement(vNode, el) {
  const tag = document.createElement(vNode.tag);
  el.appendChild(tag);
}

function mountComponent(vNode, el) {
  const instance = new vNode.tag();
  instance.$vnode = instance.render();
  mountElement(instance.$vnode, el);
}

// 所以 我们要分情况处理

function render(vNode, el) {
  if (typeof vNode.tag === "strig") {
    mountElement(vNode, el);
  } else {
    mountComponent(vNode, el);
  }
}

// 组件的种类
// 函数式组件 有状态组件
const vm = new Vue({
  render: function(createElement) {
    // 传入一些参数
    // 组件/标签 参数 子节点
    return createElement(tagOrComponent, attrs, child);
  }
});

if (!options.render) {
  let template = options.template;
  // 对template进行处理
  if (template) {
  } else if (el) {
  }

  if (template) {
    const { render, staticRenderFns } = complierToFunctions(template, {
      // some options
    });

    options.render = render;
    options.staticRenderFns = staticRenderFns;
  }
}

function normalizeArrayChildren(child, nestedIndex) {
  const res = [];
  let i, c, last, lastIndex;

  for (i = 0; i < child.length; i++) {
    c = child[i];

    lastIndex = res.length - 1; // res中的前一项索引
    last = res[lastIndex]; // res中前一项

    if (Array.isArray(c)) {
      // c是数组 继续遍历摆平 此时 nestedIndex就起作用了 标记索引
    } else if (isPrimivite(c)) {
      if (isTextNode(last)) {
      } else if (c !== "c") {
        res.push(createTextNode(c));
      }
    } else {
      // 其他情况
    }
  }

  return res;
}

function ajax(content) {
  console.log("ajax request " + content);
}

function debounce(fun, delay) {
  return function(args) {
    let that = this;
    let _args = args;
    clearTimeout(fun.id);
    fun.id = setTimeout(function() {
      fun.call(that, _args);
    }, delay);
  };
}

// let inputb = document.getElementById('debounce');
// let debounceAjax = debounce(ajax, 500)

// inputb.addEventListener('keyup', function (e) {        debounceAjax(e.target.value)    })

const standardCommand = ["rock", "scissor", "paper"];

const playerAction = process.argv[process.argv.length - 1];

if (playerAction.indexOf(playerAction) > -1) {
  let computerAction = standardCommand[Math.floor(Math.random() * 3)];
  if (computerAction === playerAction) {
    console.log("平局");
  } else {
    if (computerAction === "rock" && playerAction === "paper") {
      console.log("你赢了");
    } else {
      console.log("你输了");
    }
  }
} else {
  console.log("can not find command:" + playerAction + "please check it");
}

//

Vue.prototype._update = function(vndoe) {
  const vm = this;

  const prevVnode = vm._vnode;

  if (!prevVnode) {
    vm.$el = vm.__patch__(vm.$el, vnode, hrdrating, false);
  } else {
    vm.$el = vm.__patch(vm.$el, vnode);
  }

  // other code
};

beforeAll(() => {
  console.log("outter beforA all");
});
beforeEach(() => {
  console.log("outter beforE all");
});
afterEach(() => {});
afterAll(() => {});

describe("测试加法组的案例", () => {
  beforeAll(() => {
    console.log("inner beforA all");
  });
  beforeEach(() => {
    console.log("inner beforE all");
  });
  afterEach(() => {});
  afterAll(() => {});
  test("测试加法方法1", () => {}), test("测试加法方法2", () => {});
});

describe("测试减法组的案例", () => {
  beforeAll(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  afterAll(() => {});
  test.only("测试减法方法1(其他测试用例被忽略)", () => {}), test("测试减法方法2", () => {});
});

let config = {
  domain: "localhost",
  port: 8080
};

test("测试基础文件配置", () => {
  except(config).toMatchInlineSnapshot({
    time: except.any(Date)
  });
});

import { fetchData } from "./demo";
import Axios from "axios";

// 先是使用jest对axios进行包装
jest.mock("axios");

test("传统的模拟axios写法", () => {
  // 调用API
  Axios.get.mockResolvedValue({
    data: `(function(){ return "123" })()`
  });

  return fetchData().then(data => {
    except(eval(data)).toEqual("123");
  });
});

// 首先创建一个__mocks__ 文件 创建demo.js文件

// 写一个假的fetchData
export const fetchData = () => {
  return new Promise((resolve, reject) => {
    resolve("123");
  });
};

// 这行代码的意思是 jest需要模拟demo文件中的行为
// 代码会去选择同级__mocks__文件夹下的文件

jest.mock("./demo");

import { fetchData } from "./demo"; // 引入的也是 __mocks__下demo.js中的fetchData
const { getNumber } = jest.reuqierActual("./demo"); // 这个取得就是实际写的路径

test(`fetchData方法2模拟`, () => {
  return fetchData.then(data => {
    except(data).toEqual("123");
  });
});

// timer.js
export default cb => {
  setTimeout(() => {
    cb();
  }, 3000);
};

// 传统方法中 使用done标识符表示定时器完成就可



import { timer } from "./timer";

test("传统测试cb", () => {
  timer( (done)=>{
    except(1).toBe(1);
    done();
  })
});

jest.mockFakeTimers(); // 模拟timer

test("测试cb", () => {
  const fn = jest.fn();

  timer(fn);
  jest.runAllTimers(); // 运行timer 所有
  jest.runOnlyPendingTimers(); // 运行在当前队列中的Timer
  jest.advancedTimersByTime(3000); // 快进xx秒后执行

  except(fn).toHaveBeenCalledTimers(1);
});
