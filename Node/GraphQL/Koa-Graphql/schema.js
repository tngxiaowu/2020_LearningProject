const schema = buildSchema(
    `
    type Comment{
        id: Int,
        name: String,
        content: String
    }

    type Query{
        comment: [Comment]
    }
    `
)

schema.getQueryType().getFields().comment.resolve = ( ) =>{
    return {
        id: 1,
        name: 'laowang',
        content:' You are SB' 
    }
}

module.exports = schema;