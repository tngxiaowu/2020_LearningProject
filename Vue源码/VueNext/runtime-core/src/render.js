// 封装了渲染函数之类的
extends function createRenderer(){
    function patch(){

    }
    
    function unmount(){

    }

    // dom之间的一些比较
    const render = ( vnode,container) =>{
        if(vnode == null){
            if(container._vnode){
                unmount(container._vnode,null,null,true);
            }
        }else{
            patch(container._vnode || null,container  );
        }

    }


    return {
        render,
        createApp : createAppAPI(render)
    }
}