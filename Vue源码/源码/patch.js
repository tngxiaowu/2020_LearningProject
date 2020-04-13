function patch(oldVnode,vnode,hydrating,removeOnly){
    // 新节点不存在 旧节点存在 直接销毁旧节点
    if(isUndef(vnode)){
        if(isDef(oldVnode)) invokeDestoryHook(oldVnode);
        return;
    }
    // 新节点存在 旧节点不存在
    if(isUndef(oldVnode)){
        createElm(vnode); // 创建新节点
    }else{
        // 相同节点
        if( somevVnode(oldVnode,vnode)){
            patchVnode(oldVnode,vnode);
        }
        // 不同节点
        else{
            // 销毁 插入新节点
        }
    }
}