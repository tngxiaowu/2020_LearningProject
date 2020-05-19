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


// 栈的问题 -> 有效括号
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
  

}

function isStartTag(tag){
  return tag === '(' || tag === '{' || tag === '[' 
}

function isEndTag(tag){
  return  tag === ')' || tag === '}'  || tag === ']'
}
