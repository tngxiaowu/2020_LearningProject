let head = Symbol('head');

// 链表中的某个节点
// 单链表
class Node{
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

// 循环链表

// 双向链表

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
    // 定义头结点?
    let head = new ListNode();
    let cur = head;

    while( l1 && l2 ){
        if(l1.val <= l2.val ){
            cur.next = l1;
            l1 = l1.next;
            
        }else{
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
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
 










