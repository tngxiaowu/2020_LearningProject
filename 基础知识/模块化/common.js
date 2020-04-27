// 基本用法
{

}

// 模拟实现
{
    (function(module,exports){
        const path = require('path');

        let module = {};
        module.exports = {};

        function Module(id='',parent){
            this.id = id;
            this.path = path.dirname(id);
            this.exports = {};
            thiis.parent = parent;
            updateChildren(parent,this,false);
            this.filename = null;
            this.loaded = false;
            this.children = [];
        }

    })( module,module.exports);
}

{
    const NAME = 'Lao Wang';
    module.exports.author = NAME;
    module.exports.add = (a,b) => a + b;
}

{
    // CommonJS的一个模块 就是一个脚本文件
// require命令第一次加载该脚本 就会执行该脚本 并且在内存生成一个对象
let module = {
    id:'0000001',
    exports:{}
    loaded: true,
}


}
