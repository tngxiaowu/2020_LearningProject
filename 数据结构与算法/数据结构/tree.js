const tree = {
    val: 'A' ,

    left:{
        val:'B',
        left:{
            val:'D',
        },
        right:{
            val:'E',
        }
    },

    right:{
        val : 'C',
        left:{
            val:'F',
        },
        right:{
            val:'G'
        }
    }
} 

// 使用递归处理二叉树遍历问题
// 遍历的顺序 -> 先序遍历
function preOrder(root){
    if(!root) return;
    console.log('look pre-order',root.val); // 先遍历根节点
    preOrder(root.left); // 再遍历左节点
    preOrder(root.right); // 再遍历右节点
}

preOrder(tree);

// 中序遍历
// root.left
function inOrder(root){
    if(!root) return;
    inOrder(root.left); // 先遍历左节点
    console.log('middle order',root.val); // 再遍历根节点
    inOrder(root.right); // 遍历右节点
}

inOrder(tree);

// 后序遍历
function postOrder(tree){
    if(!tree) return;
    postOrder(tree.left);
    postOrder(tree.right);
    console.log('post-order',tree.val)
}

postOrder(tree);

const tree = {
    val: 'A' ,
    left:{
        val:'B',
        left:{
            val:'D',
        },
        right:{
            val:'E',
        }
    },
    right:{
        val : 'C',
        left:{
            val:'F',
        },
        right:{
            val:'G'
        }
    }
} 

const mockTree = {
    val:'A',
    left:{
        val:'B'
    },
    right:{
        val:'C'
    }
} 

// 使用栈堆方法处理
// 栈的特点是 先进后出
// [{ val:1,left:{},right:{}}]  ->  [{val:'C'},{ val:'B'}]
// 前序遍历
const preorderTraversal = root => {
    const res = []
    if(!root) return res;
    const stack = [];
    stack.push(root)
    while(stack.length){
        const cur = stack.pop()
        res.push(cur.val)
        if(cur.right) stack.push(cur.right)
        if(cur.left) stack.push(cur.left)
    }
    return res;
}

// 中序遍历




// 后序遍历
// 每个节点的根节点是放在最后的
const postOrderTraversal = root => {
    const res = []
    if(!root) return res;
    const stack = [];
    stack.push(root)

    while(stack){
        const cur = stack.pop() // 从栈的尾部弹出一个
        res.unshift(cur.val)
        if(cur.right) stack.push( cur.right)
        if(cur.left)  stack.push(cur.left)
    }

    return res;
}




// -> 反转二叉树
const invertTree = root => {
    if(!root) return

    let right = invertTree(root.right) // 这个right是啥
    console.log( right,'what is right')
    let left = invertTree(root.left) // 这个left是啥
    console.log( left,'what is left')

    root.left = right
    root.right = left

    return root
}

invertTree(tree)

