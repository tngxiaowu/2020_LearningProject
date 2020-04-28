// CMD

define( function(require,exports,module){
    var a = require('./a'); // 依赖可以就近书写
    a.test();

    // 按需加载
    if(status){
        var b = require('./b');
        b.test();
    }
})