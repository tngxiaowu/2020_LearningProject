  const app = new require('koa');
  const mount = require('koa-mount');
  const static = require('koa-static');

  const graphqlHttp = require('koa-grephql');

  app.use(  
      graphqlHttp({
          schema: require('./schema')
      })
  )

  app.listen(3000); 