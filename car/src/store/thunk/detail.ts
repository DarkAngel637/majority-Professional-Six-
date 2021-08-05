import { Dispatch } from 'redux';
import {getImageList, getModelColor, getSerialInfo} from '../../service'

export function getSerialInfoAction(id: string){
    return async (dispatch: Dispatch)=>{
        let result = await getSerialInfo(id);
        dispatch({
            type: 'UPDATE_INFO',
            payload: result
        }) 
    }
}

export function getImageListAction(params: {}){
    return async (dispatch: Dispatch)=>{
        let result = await getImageList(params);
        dispatch({
            type: 'UPDATE_IMAGE_LIST',
            payload: result
        }) 
    }
}

export function getModelColorAction(id: string){
    return async (dispatch: Dispatch)=>{
        let result = await getModelColor(id);
        dispatch({
            type: 'UPDATE_MODEL_COLOR',
            payload: result
        }) 
    }
}