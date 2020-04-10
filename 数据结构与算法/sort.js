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

mergesSort();

function MergesSort(arr){
    let n = arr.length;
    if(n <= 1) return;

    let middleNumber = Math.floor(n / 2);






}




