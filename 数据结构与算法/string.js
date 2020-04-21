// 字符串反正

const str = 'juejin';

function StringReserve(str){
    if(typeof str !== 'string') return;
    return str.length > 0 ? str.split('').reverse().join('') : '';
}
console.log(StringReserve(str));

// 判断一个字符串是不是回文