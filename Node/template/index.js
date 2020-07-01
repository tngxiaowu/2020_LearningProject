const user = {
    name: 'HaHa'
}

// ES6仿照模板引擎
const result = `<h2>${user.name}</h2>`

const vm = require('vm') // nodejs vm模块

const templateA = '`<h2>${include("templateB")}</h2>`';
const templateB = '`<p> hahahahahah </p>`';

// 模板字典
const templateMap = {
    templateA,
    templateB
}

// 沙箱运行环境
const context = {
    include:function(name){
        return templateMap[name]()
    },
    _:function(str){
        if(!str) return ''
        return String(str)
        .replace(/H/g, 'X')
        .replace(/a/g,'i')
    }
}


Object.keys(templateMap).forEach(  name =>{
    const temp = templateMap[name]
     
    templateMap[name] = vm.runInNewContext(`(function(){
        return ${temp}
    })`,context)
})

const s = templateMap['templateA']()

console.log(s)

 
// 将ES6模板字符串放在沙箱里
const str = vm.runInNewContext('`<h2>${_(user.name)}</h2>`',
// 在运行环境添加各种工具函数
{
    user,

    // include 子模板函数
    include: function(){

    },

    // helper函数
    helper:function(){

    },
    _:function(str){
        if(!str) return ''
        return String(str)
        .replace(/H/g, 'X')
        .replace(/a/g,'i')
    }
})

// console.log(str)


// ejs模板引擎
 const template = `<h2><%= user.name %></h2>`
 ejs.render(template,user) // 输入数据 输出字符串模板

