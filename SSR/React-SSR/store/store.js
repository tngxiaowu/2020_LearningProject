import { createStore,combineReducer,applyMiddleware } from 'redux'
import ReducThunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'

const userInitialState = {}

const LOGOUT = 'LOGOUT'

export function logout(){
    return dispatch => {
        axios.post('/logout').then( r =>{
            if(r.status === 200){
                dispatch({ type: LOGOUT })
            }else{
                console.log('OPPS -> Something Wrong Happen')
            }
        })
    }
}

function userReducer(state = userInitialState,action){
    switch (action.type){
        case LOGOUT:
            return {

            }
        default: 
            return state
    }
}

const allReducer = combineReducer({
    user: userReducer
})

export default function initializeStore(state){
    const store = createStore(allReducer,Object.assign({},{
        user: userInitialState
    }),composeWithDevTools(applicationCache(ReducThunk)))
    
    return store
}