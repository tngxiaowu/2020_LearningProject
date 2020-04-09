const myComponent = {
    props:{
        name: String,
    },
    
    setUp( props ){
        return {
            msg:'hello ${props.name}!'
        }
    },
    
    template:`<div>{{ msg}}</div>`
};