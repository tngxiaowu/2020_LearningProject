import { cursorTo } from "readline";

// 给定一个没有重复数字的序列 返回其所有可能的全排列
const arr = [1,2,3];

// 解题思路: 由树到递归


const permute =  ( nums ) => {
    const len = nums.length;

    
    const res = [];

    const visited = {};

    function dfs(nth){
        if( nth === len ){


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