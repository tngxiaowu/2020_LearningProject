import { cloneElement } from react

const style = {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight:'auto',
}
// 默认传入的组件为div 并且可以见人组件的style
export default ({ children, renderer = <div /> })=> {
    return cloneElement(renderer,{
        style: Object.assign({},renderer.props,style),
        children
    })
}


