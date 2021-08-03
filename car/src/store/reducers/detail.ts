import { IAction, IDetailInfo } from "../../utils/types";

export interface IDetailState{
    info: Partial<IDetailInfo>;
}
const intialState: IDetailState = {
    info: {}
};

function reducer(state = intialState, action: IAction){
    switch(action.type){
        case 'UPDATE_INFO': return {...state, info: action.payload};
        default: return state;
    }
}

export default reducer;