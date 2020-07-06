// 传统的有状态的类组件写法
import React , { useState,useEffect,useReducer,useContext,useRef }from 'react'

import MyContext from '../lib/my-context'



function MyCountFunc(){
    const [ counter , setCount ] = useState(0)
    const [count,diapatchCount] = useReducer(CountReduce,0)
    const [age, setAge] = useState(18)
    const context = useContext(MyContext)
    const inputRef = useRef()
    // setCount(1) // 设置一个新的值

    // setCount(  (c) => c + 1 ) // 基础最新count中

    // useEffect( ()=> {
    //     // 组件挂在时执行
    //    const interval = setInterval(() => {
    //        // 闭包陷阱 -> 这里的count是初始化执行时的count的值 也就是0
    //        setCount(count + 1) 
    //        // 这里拿到的最新的值
    //         setCount(c => c + 1)
    //         // 通过指定action来告诉如何更新状态
    //         diapatchCount({ type: 'add' })
    //     }, 1000)
    //     // 组件被卸载时会执行
    //     return () => clearInterval(interval)
    // },[])

    useEffect( ()=>{
        console.log('effect invoked')
        return ()=> { console.log('effect destoryed') }
    },[] )

    return  (<div>
        <input  ref={inputRef} value={age} onChange={  e => setAge(e.target.value)} />
        <button onClick={ ()=>{  diapatchCount({ type:'add' }) } } >  { count } </button>
        <p> {context} </p>
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