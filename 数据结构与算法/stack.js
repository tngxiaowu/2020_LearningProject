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
