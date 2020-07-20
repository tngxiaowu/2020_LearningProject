function SomeWebpackPlugin(options){
    // 这里写对配置的处理
    this.options = options;
}
// apply方法上注入了compiler对象
SomeWebpackPlugin.prototype.apply = function(compiler){
    //  在compiler自定义注册事件
    compiler.hooks.compilation.tap('eventName', compilation => {
        // 在compilation中可以触发相应事件

    })
}
// 输出一个插件
module.exports = SomeWebpackPlugin