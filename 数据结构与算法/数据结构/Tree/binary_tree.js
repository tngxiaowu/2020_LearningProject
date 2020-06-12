// 二叉树的基本结构
class TreeNode{
    constructor(value){
        this.value = value;
        this.left =  this.right = null; 
    }
}


let treeNode = {
    value: 'A',
    left:{
        value:'B',
        left:{

        },
        right:{

        }
    },
    right:{
        value:'C',
        left:{

        },

        right:{
            
        }

    }



}


// 使用栈的方式遍历二叉树
const preorderTraversal = root => {
    // 定义结果数组
    const res = []  
    // 处理边界条件
    if(!root) {
        return res
    }
    // 初始化栈结构
    const stack = [] 
    // 首先将根结点入栈
    stack.push(root)  
    // 若栈不为空，则重复出栈、入栈操作
    while(stack.length) {
        // 将栈顶结点记为当前结点
        const cur = stack.pop() 
        // 当前结点就是当前子树的根结点，把这个结点放在结果数组的尾部
        res.push(cur.val)
        // 若当前子树根结点有右孩子，则将右孩子入栈
        if(cur.right) {
            stack.push(cur.right)
        }
        // 若当前子树根结点有左孩子，则将左孩子入栈
        if(cur.left) {
            stack.push(cur.left)
        }
    }
    // 返回结果数组
    return res
  };
