export function createVNode(type, props, children, patchFlag, dynamicProps){
    // 检查vnode的Type
    if(__DEV && !type){
        warn(`Invalid Type`);
        type = COMMENT;
    }

    // class or stype normalizetion

    const shpaeFlag;

    const vnode = {

    }

    normalizeChildren(vnode,children);

    // 监听组件?


    return vnode;
}