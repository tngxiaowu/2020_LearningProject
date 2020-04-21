// src/core/vdom/create-element.js

let vnode,ns;

if(typeof tag === 'string'){
    let ctor;
    // 保留标签
    if(config.isReserved(tag)){
        vnode = new vNode();

    }else if( isDef(ctor = resolveAssert( ))){
        vnode = createComponent(ctor,data,context,children,tag);
    }else{
        vnode = new vNode();
    }
}else{
    // 直接的组件配置项 / 狗杂函数?
    vnode = createComponent(tag,data,content,children);
}

