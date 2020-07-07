    // 使用数组模仿队列
    {
        class ArrayQueue{
            constructor(){
                this.queue = []
            }

            // 添加元素到队列
            enqueue(...args){
                this.queue.push(...args)
            }


            // 删除队头元素
            dequeue(){
                this.queue.shift()
            }

            // 获取队头

            // 获取队尾

            size(){
                return this.queue.length
            }

            isEmpty(){
                return this.queue.length === 0
            }



        }


    }



    
    
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
            // 栈顶删除一个元素(删除最后一个元素)
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
        // 使用栈去模拟队列 -> 这么秀的一个操作么 66666
        class StackQueue{
            // 构造函数
            constructor(){
                this.mainStack = [];
                this.assistStack = [];
            }
            // 队列末尾添加一个元素 [4,5,6]
            push(item){
                this.mainStack.push(item);
            }
            // 删除队列第一个元素
            pop(){
                if(this.assistStack.length <= 0){
                    while( this.mainStack.length !== 0 ){
                        this.assistStack.push(this.mainStack.pop())
                    }
                }
                return this.assistStack.pop(); // 逆序 -> []

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

    // 双端队列(允许在队列的头部/尾部进行操作)

    // 示例: 输入:nums = [ 1, 3, -1 , -3 , 5 , 3 , 6 , 7] 和 k = 3 输出 [3,3,5,5,6,7]

    // 使用双端队列 核心是维护一个有效的递减队列


    const nums =  [ 1, 3, -1 , -3 , 5 , 3 , 6 , 7], k = 3;


    function getMaxValueGroup(nums,k){
        let start = 0;


        for(start + 1 - k  < 0; start++ ){
            let count = 0;
            

        }

    }

