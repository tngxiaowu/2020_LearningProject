const { graphql,buildSchema } = require('graphql')

// 数据结构
let schema = buildSchema(
    `
        tyep Query{
            hello: String
        }
    `
)
// 数据
let root = {
    hello: ()=>{
        return 'hello world'
    }
}

graphql(schema,`{ hello }`,root).then( res =>{
    console.log(res,'res')
})