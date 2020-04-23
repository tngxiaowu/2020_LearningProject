let co = require('co');
let debug = require('debug');

module.exports = {
    middleware:[],
    use: function(fn){
        this.middleware.push(fn);
        return this;
    },
    callback:function(){

    },
    compose: function(middleware){

        return function *(next){
            if(!next){
                next = function *(){}
            }

            let i = middleware.length;

            while(i--){
                next = middleware[i].call(this,next)
            }

            return yield *next;
        }

    }

}