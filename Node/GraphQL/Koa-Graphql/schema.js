const { graphql,buildSchema } = require('graphql') 


const mockData = {
    1:{

    },
    2:{

    },
    3:{

    }

}

const schema = buildSchema(
    `
    type Comment{
        id: Int,
        avatr: String,
        name: String,
        content: String
    }
    bb
    type Query{
        comment: [Comment]
    }
    `
)

schema.getQueryType().getFields().comment.resolve = ( ) =>{
    return Object.keys(mockData).map( key =>{
        return mockData[key]
    })
}

module.exports = schema;