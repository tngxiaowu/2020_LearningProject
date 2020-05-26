

// 数组队列
public class ArrayQueue {
    //  数组：items，
    //  数组大小：n 
    private String[] items;
    private int n = 0;
    // head表示队头下标，tail表示队尾下标
    private int head = 0;
    private int tail = 0;
     
    // 申请一个大小为capacity的数组 
    public ArrayQueue(int capacity) { 
        items = new String[capacity];
    }  
    
    n = capacity; //  (用n来记录数组大小) 
    // 入队
    public boolean enqueue(String item) { 
        // 如果tail == n 表示队列已经满了
        if (tail == n) return false;
        
        items[tail] = item; 
        
        ++tail;
        
    }
        return true;
     
    // 出队
    public String dequeue() { // 如果head == tail 表示队列为空 if (head == tail) return null;
           // 为了让其他语言的同学看的更加明确，把--操作放到单独一行来写了
        String ret = items[head]; ++head;
            return ret;
        }
    }


    // 使用栈去模仿队列
    // 栈和队列的区别: 栈: 先进后厨 队列: 先进先出
    // 让栈模拟先进先出 就是使用一个逆栈
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
                let l = this.stack.length;
                if (l >= 1) {
                    this.stack.length = l - 1;
                }
            }
            // 计算栈的长度
            size(){
                return this.stack.length;
            }
            isEmpty(){
                return this.stack.length === 0;
            }
        }
        
        class StackQueue{
    
            // 构造函数
            constructor(){
                this.stack = [];
            }

            push(item){
                this.stack.push(item);
            }
            // 删除队列第一个元素
            pop(){

            }


            // 入队

            // 出队
        }


    }
       
    