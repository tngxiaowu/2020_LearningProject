let head = Symbol('head');

// 链表中的某个节点
class Node{
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

class LinkedList{
    // 我先新建一个链表
    constructor(){
        this.head = new Node('head');
    }

    // 根据值查找节点
    findByValue(item){
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
}
