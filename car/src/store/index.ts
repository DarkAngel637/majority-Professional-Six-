import {createStore, applyMiddleware, combineReducers} from 'redux'
// 引入logger
import createLogger from 'redux-logger'
// 引入thunk
import createThunk from 'redux-thunk'
// 引入子reducer
import detail,{IDetailState} from './reducers/detail'
export interface IState{
    detail: IDetailState
}

const reducers = combineReducers({
    detail
})

const store = createStore(reducers, applyMiddleware(createThunk, createLogger));

export default store;