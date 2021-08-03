import { Dispatch } from 'redux';
import {getSerialInfo} from '../../service'

export function getSerialInfoAction(id: string){
    return async (dispatch: Dispatch)=>{
        let result = await getSerialInfo(id);
        dispatch({
            type: 'UPDATE_INFO',
            payload: result
        }) 
    }
}