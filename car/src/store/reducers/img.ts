import { IAction, IImageItem, IModelColorItem } from "../../utils/types";

export interface IImageState{
    imageList: IImageItem[];
    colorList: {[key:string]: IModelColorItem[]};
}
const intialState: IImageState = {
    imageList: [], 
    colorList: {}
};

function reducer(state = intialState, action: IAction){
    switch(action.type){
        case 'UPDATE_IMAGE_LIST': 
            return {...state, imageList: action.payload};
        case 'UPDATE_MODEL_COLOR':
            return {...state, colorList: action.payload};
        default: return state;
    }
}

export default reducer;