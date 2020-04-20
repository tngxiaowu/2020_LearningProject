const tree = {
    val: 0 ,
    left:{
        val:1,
        left:{
            val:3,
        },
        right:{
            val:4,
        }
    },
    right:{
        val : 2,
        left:{
            val:5,
        },
        right:{
            val:6
        }
    }
} 

// 遍历的顺序 -> 先序遍历
function preOrder(root){
    if(!root) return;
    console.log('look see it',root.val);
    preOrder(root.left);
    preOrder(root.right);
}


preOrder(tree);

