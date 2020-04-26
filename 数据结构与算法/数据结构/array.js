// 数组题目要想往难了出 基本是要结合 排序 二分 和动态规划这些相对复杂的算法思想

// 给定一个数组 和 目标数 要求从数组中找出两个数 他们之和恰好相等于目标数 

// 淳朴(直男)解法 -> 顺循环遍历
// 给定一个下标a 然后从b = a+1开始遍历 如果 arr[a] + arr[b] = target
// 那么就返回相应的索引

// 巧用Map -> 几乎所有的求和问题 最终可以转换为求差问题
// 可以通过单层循环去解决

const nums = [2,9,11,19];


const search =  (arr,target) => {

    let map = new Map();

    for(let i = 0; i < arr.length; i++){
        map.set(arr[i],i);

        let gap;



        

    }

}