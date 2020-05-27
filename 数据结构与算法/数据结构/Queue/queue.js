    // 使用栈去模仿队列
    // 栈和队列的区别:
    // 栈: 先进后出(羽毛球桶)  队列: 先进先出(十字路口的车队)
    // 让栈模拟先进先出 其策略就是使用一个逆栈
    {   
        class Stack {
            constructor() {
                this.stack = [];
            }
            // 栈顶添加一个元素
            push(item) {
                this.stack.push(item);
            }
            // 栈顶删除一个元素
            pop() {
                // let l = this.stack.length;
                // if (l >= 1) {
                //     this.stack.length = l - 1;
                // }
                this.stack.pop();
            }
            // 计算栈的长度
            size(){
                return this.stack.length;
            }
            // 计算栈是否为空
            isEmpty(){
                return this.size() === 0;
            }
        }
        // 使用栈去模拟队列
        class StackQueue{
            // 构造函数
            constructor(){
                this.mainStack = [];
                this.assistStack = [];
            }
            // 队列末尾添加一个元素
            push(item){
                this.mainStack.push(item);
            }
            // 删除队列第一个元素
            pop(){
                if(this.assistStack.length <= 0){
                    while( this.mainStack.length -- ){
                        this.assistStack.push(this.mainStack.pop())
                    }
                }
                return this.assistStack.pop();

            }
            // 计算队列的长度
            size(){

            }
            // 判断队列是否为空
            isEmpty(){
                return !this.mainStack.length && !this.assistStack.length;
            }
        }


    }