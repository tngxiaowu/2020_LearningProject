// 冒泡排序
function bubbleSort(arr){
    let n = arr.length;
    if (n <= 1) return;
        for (let i = 0; i < n; ++i) { 
            // 提前退出冒泡循环的标志位
            let flag = false;
            for (int j = 0; j < n - i - 1; ++j) {  
            // 交换
                if (arr[j] > arr[j+1]){
                    let tmp = arr[j]; 
                    arr[j] = arr[j+1]; 
                    arr[j+1] = tmp;
                    flag = true; // 表示有数据交换
                    }
            }
            if (!flag) break; // 没有数据交换，提前退出
        }
    return arr;
}

// 插入排序
function InsertionSort(arr){
    let n = arr.length;
    if (n <= 1) return;
    for (let i = 1; i < n; ++i) { 
        let value = a[i];
        let j = i - 1; // 查找插入的位置
        for (; j >= 0; --j) { 

            if (a[j] > value) {
            a[j+1] = a[j]; // 数据移动
        } }  
        a[j+1] = value; // 插入数据
    }
}

// 从为排序区域 拿一个数据插到已排序区域
const arr = [3,4,2,1]; 
function InsertSort(arr){
    let n = arr.length;
    // 从未排序区域开始
    if( n <= 1) return;

    for(let i = 1; i < n; i++){
        let j = i - 1;
        let value = a[i];
        for(; j >= 0; j--){
            if(a[j] > value ){
                a[j+1] = value;
            }
        }
    }
}

// 选择排序
function SelectSort(arr){
    let n = arr.length;
    if( n <= 1) return;
    // 变量i作为标志位 指向未排序区域
    for(let i = 0; i < n; i++){
        // 变量j作为编制为 指向已排序区域
        let j = i + 1;
        let value = a[i];
        if(a[j] > value ){
        }
    }
}

// 递推公式
// merge_sort(p…r) = merge(merge_sort(p…q), merge_sort(q+1…r))

// 研究这个算法怎么写的~
const mergeSort = ( arr ) =>{
    let l = arr.length;
    if(l <= 1) return;
    let middle = Math.floor(l/2);
    let left = arr.slice(0,middle);
    let right = arr.slice(middle);
    return mergeArr(mergeSort(left),mergeSort(right));
}


const mergeArr = (left,right) =>{
    let temp = [];
    let leftIndex = 0,
    let rightIndex = 0;

    while(left.length > leftIndex & right.length > rightIndex){
        if(left[leftIndex] <= right[index] ){
            temp.push(left[leftIndex])
            leftIndex++;
        }else{
            temp.push( right[rightIndex]);
            rightIndex++;
        }
    }

    return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));

}






let endToken = arr.length - 1,
startToken = 0,
middleToken = Math.floor(endToken/2);

// 1 2 3 4 5 6 7 8 9 10 11 12 13
// 中位数是6 
// [0,6],[7,12]
// [0,3] [4,6] / [7,9] [10.12]
// [0,1] [2,3] [4,6](分解不了) /
// [0,3],[4,7]
// [0,1],[2,3]  /  [4,5] [6,7]


// 0 - 3   4 - 8
// [startToke, middleToken]   [middleToken,endToken]
// 0 - 2 3 - 5 / 
if(middleToken < endToken){

}





// 整体合并排序
function MergesSort_g(arr){
    let n = arr.length;
    if(n <= 1) return;

    let middleNumber = Math.floor(n / 2);
}

// 小的合并排序
// 传入的参数分别为 数组 起始项 
function MergesSort_scope(arr,start,end){}

function MergeSort_global(){

}

function merge(){

}




merge_sort(A, n) {
}

merge_sort_c(A, 0, n-1)
 
* 递归调用函数
merge_sort_c(A, p, r) { // 递归终止条件 if p >= r then return
 
* 取p到r之间的中间位置q q = (p+r) / 2
* 分治递归
merge_sort_c(A, p, q) merge_sort_c(A, q+1, r)
 
// 将A[p...q]和A[q+1...r]合并为A[p...r] }merge(A[p...r], A[p...q], A[q+1...r])


