import React , { useState,useEffect,useReducer,useContext,useRef,memo,useMemo,useCallback}from 'react'


// Key Step1: 使用memo包裹整个函数式组件
const Child = memo(function child({ onButtonClick, config }){
    return ( <button  onClick={onButtonClick} style={{ color : config.style.color }}  >
    </button> )

})

// 只要触发了视图更新 那么MyCountFunc就会重新渲染一次
function MyCountFunc(){
    const [ name , setName ] = useState('Jockey')
    const [count,diapatchCount] = useReducer(CountReduce,0)
    // config就会重新声明(又是一个新的对象)
    // key2: 使用useMemo返回同一个对象(除非依赖更新)
    const config = useMemo({
        text: `count is ${count}`,
        color: count > 3 ? 'red' : 'blue'
    },[count]) // 依赖只有在count更新时重新渲染组件 

    // key 3: 方法也可以使用useMemo
    const handleButtonDispatch = useCallback( ()=> dispatchCount({ type:'add'}) ,[] )


    useEffect( ()=>{
        console.log('effect invoked')
        return ()=> { console.log('effect destoryed') }
    },[] )

    return  (<div>
        <input onClick={ e => { setName(e.target.value) } }/> 
        <Child config={config}  onButtonClick={ ()=> handleButtonDispatch } ></Child>
    </div>)
}

// 数据+action 
function CountReduce(state,action){
    switch(action.type){
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}



export default MyCount