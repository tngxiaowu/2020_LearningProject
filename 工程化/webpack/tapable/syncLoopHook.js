const  { SyncLoopHook }  = require('tapable');


class lesson{
     constructor(){
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name'])
        }
     }   

     tap(){
         this.hooks.arch.tap('one', name =>{
            console.log('one',name );
            return ++this.index === 3 ? undefined :'Go Go Go';
         })

         this.hooks.arch.tap('two', name => {
            console.log('two', name);
         })
     }

     start(){
         this.hooks.arch.call('Begin');
     }
}

let l = new lesson();

l.tap();
l.start();