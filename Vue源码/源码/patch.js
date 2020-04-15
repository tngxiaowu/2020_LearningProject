

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
            // 销毁旧节点 插入新节点
        }
    }
}


function patchVnode( oldVnode,vnode,insertedVnodeQueue,owenerArray,index,removePnlu ){
    // 静态节点处理
    // 异步组件处理
    // 处理patch
    prePatch();
    // 根据节点类型判断
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    // 新节点不为文本节点
    if(isUndef(vnode.text)){
        // 非文本节点
    
        if(isDef(ch) && isDef(oldCh)){
            // 子节点都存在
            if(oldCh !== ch) updateChildren();
        }else if(isDef(ch)){
            // 新节点的子节点存在 -> 插入子节点
            checkDuplicateKeys(); // 检查子节点的重复性

            addVnodes(); // 插入子节点
        }else if(isDef(oldCh)){
            // 旧节点的子节点存在
            removeVnodes();
        }else if(isDef(oldVnode.text)){
            // 新旧子节点都不存在 并且旧节点是文本节点
        }
    }
    // 新节点是文本节点 并且新旧节点文本不同 直接替换文本内容
    else if( vnode.text !== oldVnode.text ){
    }
    postPatch();
}

// 子节点更新策略
function updateChildren(){
    




}

