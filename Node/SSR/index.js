

// babel/register 可以将ES6转换为支持的语言
require('@babel/register')({
    presets:[ '@babel/preset-react']
})

const ReactDOMServer = require('react-dom/server');

ReactDOMServer.renderToString( 
    require('./index.jsx')
)
