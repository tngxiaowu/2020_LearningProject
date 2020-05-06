let head = Symbol('head');

// 链表中的某个节点
class Node{
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

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
 
 // 使用双指针法
 function mergeLinkedLisr(l1,l2){
     let v1,v2;
     while(l1.val && l2.val){
         v1 = l1.val;
         v2 = l2.val;

        if(v1 <= v2){

        }else{

        }
     }
 }










