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
const enum1 = [1,3,5,7]; // 按照顺序排列
const enmu2 = [2,4,6,6]; 

// 思路是 选定一个数组 两数组的最后开始比较 
function mergeTwoArray(n1,n2){
    const l1 = n1.length, l2 = n2.length;
    while( l1 && l2 ){
        if(n1[l1] <= n2[l2]){
            n1.splice(n2[l2],l1-1,1); // 插到该元素后面
            l2--;
        }else{
            l1--;
        }
    }

    if(l1 === 0 && l2 >0){
        // 将剩余的元素合并到数组后
    }

    if(l1 > 0 && l2 === 0){
        // 将剩余的元素合并到数组开头
    }

}

// 三数求和 
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 所有的求和问题 -> 转换为求差问题 a + b = -c;

// 双指针法用在设计求和、比大小类的数组时 大前提是该数组必须有序
const Enums = [ -1, -2, 3]; // 排序基础


threeNumsPlus(arr){
    let l = arr.length;
    for(let i = 0; i < l; i++){
        let temp = arr[i], rest = arr.slice(i+1,l);


    }
}





