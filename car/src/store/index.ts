import {createStore, applyMiddleware, combineReducers} from 'redux'
// 引入logger
import createLogger from 'redux-logger'
// 引入thunk
import createThunk from 'redux-thunk'
// 引入子reducer
import detail,{IDetailState} from './reducers/detail';
import img,{IImageState} from './reducers/img';

export interface IState{
    detail: IDetailState,
    img: IImageState,
}

const reducers = combineReducers({
    detail,
    img
})

const store = createStore(reducers, applyMiddleware(createThunk, createLogger));

export default store;