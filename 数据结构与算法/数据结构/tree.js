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
// 递归和栈有着脱不开的关系
// 栈的特点是 先进后出
// [{ val:1,left:{},right:{}}]  ->  [{val:'C'},{ val:'B'}]

// 前序遍历
const preorderTraversal = root => {
    const res = []
    if(!root) return res;
    const stack = [];
    stack.push(root)
    while(stack.length){
        const cur = stack.pop() // 这是一个出栈的时机
        // 一旦出栈的时机变了 那么入栈的时机也会发生改变
        res.push(cur.val)
        if(cur.right) stack.push(cur.right)
        if(cur.left) stack.push(cur.left)
    }
    return res;
}

// 中序遍历: 左节点 -> 根节点 -> 右节点
// 在中序遍历中 根节点不再出现在遍历顺序的中间
const middleOrderTraversal = root => {
    const res =[]
    if(!root) return res
    const stack = []
    
    let cur = root
    // 对栈进行处理
    while(cur || stack.length){
        // 将左子树放置到
        while(cur){
            stack.push(cur)
            cur = cur.left
        }

        cur = stack.pop()
        res.push(cur.val)

        cur = cur.right // 再把右子树的东西放置进去

    }
    return res;
}

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



// 异步1
// 异步2

{

}
{

}






