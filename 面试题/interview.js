// 作用域的题目
{
    var user = 'outter';
    function first(){
        console.log(user);
    }
    function second(){
        var user = 'inner';
        first();
    }
    second();


}