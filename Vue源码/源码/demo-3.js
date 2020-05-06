// 一个简单的ASTElement为

// export type ASTElement {
//   type:Number,// 节点类型
//   tag:String, //标签名

//   attrsList: Array, // 属性列表
//   attrsMap: Object,// 属性列表
//   rawAttrsMap: Object, // 原生属性列表

//   parent: Object,// 父节点
//   children:Array // 子节点
// }

// 处理

const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;

// const startTagOpen = new RegExp(`^<${qnameCapture}`); // 以^开头

const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

const endTagFn = /^<\/((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)[^>]*>/;

const template5 = `</div>`;
console.log(template5.match(endTagFn));

console.log(endTag, "endTag");

// 如何生成AST语法树
while (html) {
  let index = 0, // 位置
    last, // 当前剩下的字符串
    lastTag; // 当前的标签

  if (!lastTag || !isPlainTextElement(lastTag)) {
    // 处理 非文本节点: 开始/结束/注释/条件注释 节点
    let textend = html.index("<");
    if (textend === 0) {
      // 注释处理
      if (comment.test(html)) {
      }
      // 条件注释处理
      if (conditionalComment.test(html)) {
      }
      // docttype处理
      const doctypeMatch = html.match(doctype);
      if (doctypeMatch) {
      }
      // 结尾标签处理
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
      }
      // 开始标签处理
      const startTagMatch = html.match(startTag);
      if (endTagMatch) {
      }
    }

    handleText();
    advance(textLength);
  } else {
    // 处理文本节点

    handlePlainTextElement();
    parseEndTag();
  }
}

const reg = /(?:([a-zA-Z_][\\-\\.0-9_a-zA-Z]*)\\:)? ([a-zA-Z_][\\-\\.0-9_a-zA-Z]*)/;

const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const template = ` id='app'> laowang </div>`;
console.log(template.match(attribute));

const template2 = ` id='app'> laowang </div>`;

const startTagClose = /^\s*(\/?)>/; // 以任意的空格作为开头 匹配\> 其中\可以不需要
const template3 = `> laowang </div>`;

console.log(template3.match(startTagClose));

const template4 = `/> laowang </div>`;
console.log(template4.match(startTagClose));

const match = {
  tagName: "div",
  attrs: [[" id = app", "id", "=", undefined, "app", undefined]],
  start: 0,
  unarySlash: "",
  end: 12
};

let attrs = [{ name: "class", value: "id", start: 6, end: 10 }];

const ASTElement = {
  type: 1,
  tag: "div",
  attrsList: [{ name: "class", value: "id", start: 6, end: 10 }],
  attrsMap: { class: "id" },
  rawAttrsMap: {},
  parent: null,
  children: [{ type: 3, text: "laowang" }]
};

const html = ` laowang </div>`;

let textEnd = html.indexOf("<");

// 获取文本字符串 + 对字符串进行截取
if (textEnd >= 0) {
  let rest, text; //rest:截取文本之后的字符串  text:截取到的文本字符串

  // plainText情况下的处理
  while (html) {}
  rest = html.slice(textEnd);

  text = html.substring(0, textEnd);
}

if (text) {
  advance(text.length);
}

// 调用char的回调函数
if (options.char && text) {
  options.char(text, index - text.length, index);
}

function char(text, start, end) {
  // 如果没有父节点 -> 提示报错
  if (!currentElement) {
    warn();
  }

  // IE下 text-area bug的修复
  if (isIE && customElement.tagName === "textarea") {
  }
}

function parseEndTag(tagName, start, end) {
  let pos, lowerCasedTagName;
  // 参数处理
  if (start == null) start = index;
  if (end == null) end = index;

  if (tagName) {
    lowerCasedTagName = tagName.toLowerCase();
    // 在栈中找到最近的一个标签
    for (let pos = stack.length - 1; pos >= 0; pos--) {
      if (stack[pos].lowerCasedTagName === lowerCasedTagName) {
        break;
      }
    }
  } else {
    pos = 0;
  }

  if (pos >= 0) {
    // 防止匹配错误

    if (options.end) {
      options.end(stack[i].tag, start, end);
    }
  }
}

for (let i = 0; i < 5; i++) {
  if (arr[i] === 1) {
  }
}

// 一个最简单的Vue-Router配置实例

[
  {
    path: "/foo",
    component: InstanceOne
  },
  {
    path: "/bar",
    component: InstanceTwo
  }
];

const RouterRecord = {
  path: "/foo",
  regx: {},
  component: InstanceOne,
  instance: {},
  name: undefined,
  parent: undefined,
  matchAs: undefined,
  redirect: undefined,
  beforeEnter: undefined,
  meta: {},
  props: {}
};

const pathList = ["/foo", "/bar"];

const pathMap = {
  "/foo": {
    path: "/foo",
    regx: {},
    component: InstanceOne,
    instance: {},
    name: undefined,
    parent: undefined,
    matchAs: undefined,
    redirect: undefined,
    beforeEnter: undefined,
    meta: {},
    props: {}
  },
  "/bar": {
    path: "/bar",
    regx: {},
    component: InstanceTwo,
    instance: {},
    name: undefined,
    parent: undefined,
    matchAs: undefined,
    redirect: undefined,
    beforeEnter: undefined,
    meta: {},
    props: {}
  }
};

// 如果定义了name 就会有nameMap
function match(raw, currentRoute, redirectForm) {
  const location = normalizedLocation(raw, currentRoute, false, route);
  const { name } = location;

  // 根据name 或者 path寻找匹配
  if (name) {
    return _createRoute(record, location, redirectedFrom);
  } else if (location.path) {
    for (let i = 0; i > pathList.length; i++) {
      if (matchRoute()) {
        return _createRoute();
      }
    }
  }
  // 匹配不上
  return _createRoute(null, location);
}

function runQueue(queue, fn, cb) {
  // index为队列中的位置
  let step = index => {
    if (index > queue.length) {
      // 执行最终的回调函数
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };

  step[0]; // 从第一个开始执行
}

var bar = {
  myName: "time.geekbang.com",
  printName: function() {
    console.log(myName);
  }
};

function foo() {
  let myName = "极客时间";
  return bar.printName;
}

let myName = "极客邦";
let _printName = foo();
_printName(); // 极客时间
bar.printName(); // 极客邦

var myObj = {
  name: "极客时间",
  showThis: function() {
    console.log(this);
    function bar() {
      console.log(this);
    }
    bar();
  }
};
myObj.showThis();


const obj = {
  name: "Xiao Ming"
};

const baseHandlers = {
  get:function(target,key,recevier){
    // 可以在这里面做文章
    return Reflect.get(target,key,recevier)
  },
  set:function(target,key,value,recevier){
    // 可以在这里面做文章
    return Reflect.set(target,key,value,recevier)
  }
};

const prpxyObj = new Proxy(obj, baseHandlers);




const a = {
  b:ref(1)
}
const observed = reactive(a); // { b:1 }
observed.b = 2; // 处理的就是这种情况


const a = {name:'laowang'};


let b = new Proxy( a,{
  get(target,key,recevier){
    console.log(recevier,'recevier');
    return Reflect.get(target,key,recevier);
  }
} )
console.log(b.name,'what happen?');

const child = new Proxy(
  {},
  {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      console.log('child', receiver)
      return true
    }
  }
)

const parent = new Proxy(
  { a: 10 },
  {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      console.log('parent', receiver)
      return true
    }
  }
)

Object.setPrototypeOf(child, parent)

child.a = 4 // 这里会触发两次 所以对于父元素的触发就不做收集和派发

const proxy = new Proxy([], {
  set(target, key, value, receiver) {
    console.log(key, value, target[key])
    return Reflect.set(target, key, value, receiver)
  }
})
proxy.push(1) // arr[0] = 1 时更新一次   arr.length = 1 时更新一次

console.log(a);
let a = 1;

function Red(){
  console.log('red');
}

function Yellow(){
  console.log('yellow');
}

function Green(){
  console.log('green');
}

let index = 0;

function trunOn(){
  let cb;
  if(index === 2){
    index = 0;
    cb = Green;
  }else if(index === 1) {
    index = Yellow;
    cb = red;
  }else if(index === 0){
    index = 1;
    cb = Red;
  }
}

// Red -> Yellow - Green 

// 先执行 
var r = new Promise(function(resolve, reject){
  console.log("a"); // -> 首先执行匿名函数 function(res,rej){  console.log('a'); res(); } 
  resolve()
}); // 将执行的结果放入微队列 
r.then(() => console.log("c")); // 微观队列的执行结果
setTimeout(  function(){  console.log('d'),1000}) // 宏任务 

console.log("b") // 宏任务 

// 产生宏任务1 推到宏任务队列中(等主线程中的脚本执行完 再执行)
setTimeout(()=>console.log("d"), 0) 
// 执行promise 创建微任务
var r = new Promise(function(resolve, reject){
    console.log('a');
    resolve()
}); 
// 微任务执行 
r.then(() => { 
    // 执行代码 
    var begin = Date.now();
    while(Date.now() - begin < 1000); // -> 延时一秒执行
    console.log("c1") 
    // 创建微任务 
    new Promise(function(resolve, reject){
        resolve()
    }).then(() => console.log("c2")) // 执行微任务
});


function sleep(duration) { 
  return new Promise(
    function(resolve, reject) { 
      console.log('c');
      setTimeout(resolve,duration); 
    })
}
  
  
async function foo(){ 
  console.log("a") 
  await sleep(2000) 
  console.log("b")
}

foo();

// 自主兴趣小组
function f(){};
const a = f.prototype, b = Object.getPrototypeOf(f);


console.log( a === b);



// 基础编译
function baseCompile(template,options){
  const onError, // 报错处理 
  isModuleMode;  // 是否是模块模式
  // 在浏览器环境下
  if(__browser__){

  }
  const prefixIdentifiers; // 前缀标识符?
  const ast = isString(`template`) ? baseParse(template,options) : template;
  // 一系列转换配置项
  transfrom(ast,{});
  // 生成代码
  return generate( ast,{ ...options,prefixIdentifiers} )
}


function baseParse( content,options){
  const 

}

for( let item of [1,2,3] ){
  let index = this.

  console.log(  index)
}








