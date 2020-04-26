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

// 回文字符串的对称特性(利用指针特性)
// a  c  d a
function isPlaindromeIfDeleteOne(str){
    let l = str.length, 
        m = Math.floor(l/2);
    for(let i = 0 ; i < m ; i++){
        if(str[i]  !== str[l-i-1]){
           let isPlain = str[i+1] === str[l-i-1] || str[i] === str[l-i];
           if(!isPlain){
            return false;
            break;
           }
        }
    }
    return true;
}

isPlaindromeIfDeleteOne('acdea');

// 
class wordCollection{
    constructor(){
        // 用Map比Set好的一点是 查找效率会更高点(字典数据结构)
        this.wordList = new Map();
    }

    addWord(word){
        let l = word.length ,r = this.wordList.get(l);
        if( r != null ){
            r.push(world)
            this.wordList.set(l,r);
        }else{
            this.wordList.set(l,[ word ]);
        }
    }

    search(word){
        let l = word.length,r = this.wordList.get(l);
        if(  r == null){
            return false;
        }else{
            if(word.indexOf('.') > -1){
                const reg = new RegExp(word);
                return r.some( item => {
                    return reg.test(item)
                } )
            }else{
                return r.includes(word);
            }
        }
        
    }   
}

// 正则表达式更进一步——字符串与数字之间的转换问题
function atio(str){
    const reg = /s/;


    // 判断+号或减号
    // 去除空格后
    let plusOrMinusReg = /^(+|-)/;

}




