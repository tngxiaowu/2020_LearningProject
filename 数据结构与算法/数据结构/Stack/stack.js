// 用数组模拟栈(如何实现)
class Stack {
  constructor() {
    this.stack = [];
  }
  pop() {
    let l = this.stack.length;
    if (l >= 1) {
      this.stack.length = l - 1;
    }
  }
  add(item) {
    this.stack.push(item);
  }
}

// 栈的问题 -> 每日温度问题
// 栈结构可以避免不必要的重复操作
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
function getStack(temperatures){

}



// 栈的问题 -> 有效括号
// ({[]}) ->  ({[     ]}) -> 
function isActiveStr(str){
  // str = str.split('');
  let startStack = [],endStack = [];

  for(let tag of str){
    if(isStartTag(tag)){
      startStack.push(tag);
    }else if(isEndTag(tag)){
      endStack.push(tag);
    }
  }

  let l = startStack.length;
  
  while(l--){
    if(startStack[l-1])
  }

}

function isStartTag(tag){
  return tag === '(' || tag === '{' || tag === '[' 
}

function isEndTag(tag){
  return  tag === ')' || tag === '}'  || tag === ']'
}
// 栈问题 -> 
// 相关技巧: 维护一个递减栈
const dailyTemperatures = ( T ) =>{
  const l = T.length;
  const stack = [];
  const res = (new Array(l)).fill(0);

  for(let i = 0; i < l; i++){
    while(stack.length && T[i] > T[stack[stack.length - 1]]){
      
    }
  }
}

// 栈的问题 -> 最小栈
// 空间换时间
class miniStack {
  constructor(){
    this.stack = [];
    this.stack2 = []; // 辅助栈 -> 维护一个从大小的栈
  }

  push(item){
    this.stack.push(item);
    if(!this.stack2.length || this.stack2[this.stack2.length-1] >= item){
      this.stack2.push(item);
    }
  }

  pop(){
    if(this.stack.pop === this.stack2[this.stack2.length -1]){
      this.stack2.pop();
    }
    
  }
  // 获取栈顶元素
  top(){
    return this.stack[this.stack.length - 1];
  }

  getMin(){
    return this.stack2[this.stack2.length -1];
  }
}


// 一种比较运算复杂的方法
class miniStackTwo{
  constructor(){
    this.stack = [];
  }

  push(item){
    this.stack.push(item)
  }

  pop(){
    this.stack.pop();
  }

  top(){
    return this.stack[this.stack.length - 1];
  }

  getMin(){
    const { stack } = this;
    let miniValue = Infinity;

    for(let item of stack){
      if(miniValue < item){
        miniValue = item;
      }
    }
    return miniValue;
  }
}
