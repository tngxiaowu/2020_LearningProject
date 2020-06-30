// 二叉树的基本结构
class TreeNode{
    constructor(value){
        this.value = value;
        this.left =  this.right = null; 
    }
}


const fakeData = [1,null,2,3];

// 使用递归进行先序遍历







// [ root,left,right, left-left,left-right,right-left,right-right]
// 栈的出栈顺序 符合二叉树的前序遍历规则
// 前序遍历: 根节点 -》 左节点 -> 右节点

// 使用栈的方式遍历二叉树
// 先序遍历 -> 根节点 左节点 右节点
// 栈顺序结构: 右节点 左节点 根节点
const preorderTraversal = root => {
    // 定义结果数组
    const res = []
    // 处理边界条件
    if(!root) {
        return res
    }
    // 初始化栈结构
    const stack = [] 
   
    stack.push(root)   // 将根结点入栈

    // 若栈不为空，则重复出栈、入栈操作
    while(stack.length) {
        const cur = stack.pop()  // 将栈顶结点记为当前结点
        res.push(cur.val) // 当前结点就是当前子树的根结点，把这个结点放在结果数组的尾部
        
        if(cur.right) {  
            // 若当前子树根结点有右孩子，则将右孩子入栈
            stack.push(cur.right)
        }
       
        if(cur.left) {  
            // 若当前子树根结点有左孩子，则将左孩子入栈
            stack.push(cur.left)
        }
    }
    // 返回结果数组
    return res
};


const res = preorderTraversal(treeNode);


// 后序遍历: 左节点 -> 右节点 -> 根节点
// 所以说 栈的顺序是 根节点 右节点 左节点
const postTraversal = root => {
    const res = [];
    
    if(!root){
        return  res;
    }

    const stack = [];
    stack.push(root); // 先把树节点推进栈
    // 开始进行出栈入栈操作
    while(stack.length){
        const cur = stack.pop();
        res.unshift(cur.val);
        if(cur.left){
            stack.push(cur.left)
        }
        if(cur.right){
            stack.push(cur.right)
        }
    
    }
    return res;
}

let treeNode = {
    val: 'A',
    right:{
        val:'B',
        left:{
            val:"C"
        },
    }
}

const res = postTraversal(treeNode)


// 中序遍历(正常顺序) -> 左 - 根 - 右 
// 逆向排序 右 -> 根 -> 左
const middlTraversal = root => {
    

    if(!root) return;

    const res = [];
    const stack = [];
    stack.push(root);

    while(stack.length ){
        // res.push(stack.pop());
        const cur = stack.pop();

        if(cur.right) stack.push(cur.right);
    }
    return res;
}