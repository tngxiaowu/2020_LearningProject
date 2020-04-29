// var 和 function(这里的function指的是普通函数)的穿透性

function foo(){
    // 在if等条件语句中的function可能有点小复杂
    if(false){
        function bar(){
            console.log('Hello,I am bar');
        }
        var a = 1;
    }
    console.log(bar,a,'what is bar');
}

foo();


console.log(fee,'what is fee');
function fee(){
    console.log('Hello,I am fee');
}

{
    var c = 1;
    function foo(){ 
        console.log(c); 
        class c {}
    }
    foo();// 去掉函数内的c 无事发生 不报错
}