// 深度遍历
// 给定一个没有重复数字的序列 返回其所有可能的全排列
const arr = [1,2,3];

// 解题思路: 由树到递归
const permute =  ( nums ) => {
    const len = nums.length; // 计算数组的长度
    const res = []; // 保存所有的排列顺序 
    const cur = []; // 保存当前分支上的排列顺序
    const visited = {}; // 避免重复的flag
    // 深度遍历 
    function dfs(nth){
        // 边界
        if( nth === len ){
            res.push(cur.slice()) // 已经到了边界
            return;
        }
        for( let i = 0; i < len; i++){
            if(!visited[nums[i]]){
                visited[ nums[i]] = 1
                curr.push( nums[i])
                dfs( nth + 1 );
                curr.pop()
                visited[nums[i]] = 0
            }
        }
    }

    dfs(0); // 从0号索引开始递归

    return res;


}