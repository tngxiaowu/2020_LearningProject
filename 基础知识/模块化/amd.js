var require,define;


{
    // 参数分别为 -> id:(可选参数) 模块唯一标识符 依赖的模块数组 模块初始化的一些操作 
    define(id,[dependence],callback);
    // 参数分别为 -> 依赖的模块数组 依赖模块加载成功之后执行的回调函数
    require([moduleName],callback);
}

( function( global,setTimeout){})(
    this,(typeof setTimeout === 'undefined' ? undefined : setTimeout)
)