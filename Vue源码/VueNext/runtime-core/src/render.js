extends function createRenderer(){


    // dom之间的一些比较
    const render = (  vnode,container) =>{
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
        createApp : createAppApu(render);
    }
}