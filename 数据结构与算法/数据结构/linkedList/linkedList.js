let head = Symbol('head');
let A_SIMPLE_DOUBLY = {
    head:{
        value:'1',
        prev:null,
        next:null,
    },// 头部节点
    tail:{
        value: '1',
        prev: null,
        next: null
    } // 尾部节点

}

// 链表中的某个节点
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null; // 为了兼容双向列表
    }
}


// 单链表

// 循环链表

// 双向链表
// 示例的数据结构



const doubleLinkedList = {
    head:{
        value:1,
        prev: null,
        next: null,
    },
    tail:{
        value:1,
        prev: null,
        next: { 
            value:2,
            perv: {
                value:1,
                prev:null,
                next:null,
            },
            next:null,  },
    }
}

const demoNode = {
    value:2,
    perv: {
        value:1,
        prev:null,
        next:null,
    },
    next:null,

}

class Node{
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null; // 为了兼容双向列表
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null // 开头
        this.tail = null // 结尾
    }
    
    // 在链表尾部新增一个节点
    add(item){
        const node = new Node(item)
        // 如果头部没有信息 那么先添加头部
        if(this.head === null){
            this.head = node;
            this.tail = node;
        }// 如果链表有了头 那么在尾部添加节点即可
        else{
            node.prev = this.tail // 新增节点的上一个节点是尾节点
            this.tail.next = node // 尾部节点的下个节点为该节点(主要是为头部节点服务的)
            this.tail = node // 重新替换
        }
    }

    // 在特定位置插入值
    addAt(index,value){
        let current = this.head; // 当前节点
        let counter = 0; // 层级数
        let node = new Node(item); // 新增节点
        // 如果counter为0 那就是说添加到头部
        if(index === 0){
            this.head.prev = node;
            node.next = this.head
            this.head = node
        }else{
            while(current){
                current = current.next

                if(counter === index){
                    current.

                }
                counter++

            }


        }


    }

}

  const d1 = new Node(1)
  const d2 = new Node(2)
  
  const Linked = new DoublyLinkedList()

  Linked.add(d1)
  Linked.add(d2)

  console.log(Linked,'linked')


// 双向循环链表

// 整个链表
class LinkedList{
    // 我先新建一个链表
    constructor(){
        this.head = new Node('head');
    }
    // 根据值查找节点
    findByValue(item){
        // 从头开始查找
        let currentNode = this.head;
        while( currentNode != null && currentNode.element !== item ){
            currentNode = currentNode.next;
        }
       return currentNode == null ? -1 : currentNode;
    }

    // 根据下标查找节点
    findByIndex(index){
        let currentNode = this.head,pos =1;
        while( currentNode != null  && pos !== index ){
            currentNode = currentNode.next;
            pos++;
        }
        return pos == null ? =1 : pos;
    }
    // 向链表末尾添加节点
    add(element) {
        const newNode = new Node(element);
        let currentNode = this.head;
        while(currentNode.next){
            currentNode = currentNode.next;
        }
        currentNode.next = newNode;
    }

    // 在指定元素后插入
    insert(sourceElement,targetElement){
        const target = this.findByValue(targetElement);
        if( target === -1 ){
            console.log('未找到该元素');
            return;
        }
        const newNode = new Node( sourceElement );

        newNode.next = target.next;
        target.next = newNode;
    }

    // 查找前一个
    findByPrev(item){
        let currentNode = this.head;// 从头开始查找
        
        while( currentNode.next != null && currentNode.next !== item ){
            currentNode = currentNode.next;
        }
        return currentNode.next == null ? -1 : currentNode;
    }


    // 根据值删除(删除前一个的引用)
    remove(item){
        const prevNode = this.findByPrev(item);

        if(prevNode === -1){
            console.log('没有找到该要素');
            return;
        }

        // 引用重写就好了
        prevNode.next = prevNode.next.next;
    }

    
    // 单链表反转 -> 将 1-3-2 反转为 2-3-1 
    reversed(){
        const currentNode = this.head; // 链表的特性 -> 从头开始查找
        let pre = null;
        while(currentNode.next){
            let next = currentNode.next;
            currentNode.next = pre; // 当前节点的执行
            pre = currentNode;
            currentNode = next; // 下一个节点的指向前一个
        }
        return pre;
    }
}


// 链表的合并
let linkedListOne = {  
    val:1,
    next:{ val:2,next:{   val:4, next:null}}
}

let linkedListTwo = { 
    val:1,
    next:{ val:3,next: { val:4,next:null}}
 }
 

class ListNode{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

 // 有序列表的合并
function mergeLinkedLists(l1,l2){
    let head = new ListNode();  // 定义头结点
    let cur = head;
    while( l1 && l2 ){
        if(l1.val <= l2.val ){
            cur.next = l1;
            l1 = l1.next;
        }else{
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;// 指针向后移
    }
    // 指针长度不一的情况
    cur.next = l1 != null ? l1 : l2;
 }

 const mergeTwoLists = function(l1, l2) {
    // 定义头结点，确保链表可以被访问到
    let head = new ListNode()
    // cur 这里就是咱们那根“针”
    let cur = head
    // “针”开始在 l1 和 l2 间穿梭了
    while(l1 && l2) {
        // 如果 l1 的结点值较小
        if(l1.val<=l2.val) {
            // 先串起 l1 的结点
            cur.next = l1
            // l1 指针向前一步
            l1 = l1.next
        } else {
            // l2 较小时，串起 l2 结点
            cur.next = l2
            // l2 向前一步
            l2 = l2.next
        }
        
        // “针”在串起一个结点后，也会往前一步
        cur = cur.next 
  
    }
    
    // 处理链表不等长的情况
    cur.next = l1!==null?l1:l2
    // 返回起始结点
    return head.next
  };


  // 删除有序列表中的重复元素
  // 思路:
  // 类似使用冒泡排序的方式 两两比较 发现相同的 就指向下一个节点
  function deleteSameNode(LinkedList){
    let cur = LinkedList; // 设定初始指针
    while(cur && cur.next){
        if(cur.val === cur.next.val){
            cur.next = cur.next.next; // 跳过一个节点
        }else{
            cur = cur.next; // 下一个节点
        }
    }
    return LinkedList;
  }

  // 删除问题的延伸:删除列表中所有的重复节点 
  // 我的思路 : 维护一个重复值的map列表 
  // 比如说 1 -> 2 -> 2 -> 2 -> 3 -> 3 -> 4  => 1 -> 4
  // 经典的链表题中遇到的问题: 链表的第一个节点 因为没有前驱节点 导致我们面对它无从下手
  // dummy节点 -> 人为制造出来的第一个节点 
  function deleteAllSameNode(LinkedList){

  }
// 删除链表中倒数第n个节点
// 示例: 1 -> 2 -> 3 -> 4 -> 5   n = 2
let linkedList = {
    val:1,
    next:{ 
        val:2,
        next:{ 
            val:3,
            next:{  
                val:4, 
                next:{  
                    val:5,
                    next:null
                    } 
                } 
            } 
        }
    }

// 计算长度 然后根据长度去计算它所在的位置
function calculateLinkedListLength(l){
    let cur = l;
    while( cur.next != null ){

    }
}

// 快慢指针方法 利用快慢指针 之间差值 
// 如果倒数第几个的话 那么我就设置快慢指针之间的差值为n即可 
// 非常牛逼的思路
 










