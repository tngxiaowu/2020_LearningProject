import { createStore,combineReducer,applyMiddleware } from 'redux'
import ReducThunk from 'redux-thunk'
import composeWithDevTools from 'redux-devtools-extension'

const ADD = 'add'
const UPDATE = 'UPDATE'

const countInitialState,
 = {
    count: 0
}

const userInitialState = {
    name: 'Jockey'
}

// action creator
function add(num){
    return {
        type:ADD,
        num
    }
}

function addAsync(num){
    return (dispatch) => {
        setTimeout(()=>{
            dispatch(add(num))
        },1000)
    }
}

store.dispatch(addAsync(1))


function countReducer(state = countInitialState,,action){
    switch (action.type){
        case 'ADD':
            // 不建议以下写法
            // state.count += 1 
            return { count: state.count + 1  }
        default:
            return state
    }
}

function userReducer(state = userInitialState,action){
    switch (action.type){
        case 'UPDATE':
            return {  
                ...state,
                name: action.name }
        default: 
            return state
    }
}

const allReducer = combineReducer({
    count: countReducer,
    user: userReducer
})

const store = createStore(combineReducer,{
    count: countInitialState,
    user: userInitialState
},composeWithDevTools(applicationCache(ReducThunk)))

store.getState()

store.dispatch({ type:ADD })
store.dispatch({ type: UPDATE, name:'Laowang' })

// 每当store更新时 就会调用
store.subscribe( ()=>{

})

export default store