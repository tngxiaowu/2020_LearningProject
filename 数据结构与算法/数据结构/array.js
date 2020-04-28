// 数组题目要想往难了出 基本是要结合 排序 二分 和动态规划这些相对复杂的算法思想

// 给定一个数组 和 目标数 要求从数组中找出两个数 他们之和恰好相等于目标数 

// 淳朴(直男)解法 -> 顺循环遍历
// 给定一个下标a 然后从b = a+1开始遍历 如果 arr[a] + arr[b] = target
// 那么就返回相应的索引

// 巧用Map -> 几乎所有的求和问题 最终可以转换为求差问题
// 可以通过单层循环去解决  [0 1] [0 2] [0 3] [1 2] [1 3] [ 2 3] 

// 使用map进行转换 -> 
const numsToMap = {
    2: 0,
    9: 1,
    11: 2,
    19: 3
};

const nums = [2,9,11,19]; 
var search =  (arr , target) => {
    let map = new Map();
    // 遍历循环整个数组
    for(let i = 0; i < arr.length; i++){
        map.set(arr[i],i);
        if(map.size >= 2){
           let gap = target - arr[i] ,r = map.get(gap);
           console.log(gap, map,'what is gap',r);
           if( r != null) return [map.get(arr[i]),r];
        }
    }
    return [-1,-1];
}

console.log(search(nums,13),'Result'); 





// 强大的双指针法 -> 合并两个有序数组
// 解决方案 -> 双指针法
const enum1 = [1,3,5,7];
const enmu2 = [2,4,6,8];


function mergeTwoArray(n1,n2){
    const l1 = n1.length, l2 = n2.length;

    if(n1[l1] <= n2[l2]){
        n1.push(n2[l2])
        l2--;
    }else{
    
    }

}

// 三数求和


