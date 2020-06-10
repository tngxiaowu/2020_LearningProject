const { graphql , buildSchema } = require('graphql');

// 数据结构
let schema = buildSchema(
    `
    type Query{
        hello: String
    }
    `
)

// 数据源
let root = {
    hello: ()=>{
        return 'Hello Wrold!'
    }
}


module.exports = ( query ) => {
    // 参数1: 给定的数据结构
    // 参数2: 需要获取的参数
    // 参数3: 获取数据源
    return graphql(schema,query,root).then( res =>{
        return res;
    } )
}