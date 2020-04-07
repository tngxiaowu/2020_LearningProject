// 冒泡排序
function budleSequence(arr){
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

