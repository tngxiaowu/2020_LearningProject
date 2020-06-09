// 广度遍历

// 给定一组不含重复元素的整数数组nums 返回该数组所有可能的子集(幂集)

const enums = [1,2,3];


function getSubCollection(enums){
    const res = []; // 最终返回的结果
    const l = enums.length; // 数组长度
    let start = 0;
    const subSet = [];

    dfs(0);

    function dfs(index){
        res.push(subSet.slice());

        for(let i = index; i < l;i++){
            subSet.push(enums[i]);
            dfs(i+1);   
            subSet.pop();//最后一步

        }


    }



}