// 字符串反正

const str = 'juejin';



function StringReserve(str:String){
    // 如果用ts写 那么就省了很多的类型校验所需的代码
    // if(typeof str !== 'string') return;
    return str.length > 0 ? str.split('').reverse().join('') : '';
}
console.log(StringReserve(str));

// 判断一个字符串是不是回文
// 实现手法1:
function isPlaindrome(str:String){
    return StringReserve(str) === str;
}

// 实现手法2: 从中间将字符串劈开 然后使用遍历
function isPlaindrome(str:String){
    let l = str.length, m = Math.floor(l/2);
    if(l === 1) return true;
    for(let i = 0; i < l; i++){
        if(str[i] !== str[l-m-i]){
            return false;
        }
    }
    return true;
}

// 回文字符串的对称特性
function isPlaindromeIfDeleteOne(str){
    let l = str.length, m = Math.floor(l/2);


}



