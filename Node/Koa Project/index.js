const Koa = require("koa");

const app = new Koa();

// node.js核心模块 http
const http = require("http");
// 接受一个以req,res为参数的函数
http.createServer((req, res) => {});

app.use(async (ctx, next) => {
  ctx.body = "hello Luke!";
});

app.listen(2000);

// application.js
// Appliaction类继承Emitters对象 它可以使用Emitters对象中的自定义事件和原生事件
module.exports = class Application extends Emitters {
  constructor() {
    super();

    this.proxy = false;
    this.middleware = []; // 核心:中间件
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || "development";
    this.context = Object.create(context); // 核心:执行上下文对象
    this.request = Object.create(request); // 核心: 请求对象
    this.response = Object.create(response); // 核心: 响应对象
    if (uti.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }
  }

  use(fn) {
    if (isGenerationFunction(fs)) fn = convert(fn); // 是否是旧的函数写法 如果是 那么将函数进行转义
    this.middleware.push(fn); // 核心代码: push一个函数到中间件属性
    return this; // 返回koa对象实例
  }
};

const delegate = require("delegates"); // 引入依赖 delegate

// context.js

// 输出一个proto对象
const proto = (module.exports = {
  // 安置一些工具函数
});

// 对自定义监控函数的处理
if (util.inspect.custom) {
}

// 核心代码: 在proto 原型链上 各自代理response和request的方法
delegate(proto, "response")
  .method()
  .access()
  .getter();
delegate(proto, "request")
  .method()
  .access()
  .getter();

// 参数1:目标对象  参数2: 代理对象
function Delegeates(prto, target) {
  // 可以避免使用new操作符
  if (!this instanceof Delegeates) return new Delegeates(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}



Delegeates.prototype.method = function(name) {
  let proto = this.proto;
  let target = this.target;

  this.methods.push(name);

  // 委托代理的核心代码
  proto[name] = function() {
    return this[target][name],apply(this[target],arguments )
  };

  return this; // 链式调用的基础
};

// access 就是获取代理对象的修改权
Delegeates.prototype.access = function(name){
    return this.getter(name).setter(name);
}








