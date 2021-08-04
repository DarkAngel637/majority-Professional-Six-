import request from '../../utils/request';

// 获取车系图片
export let getImageList = (serialId: string)=>{
    return request(`v2-car-getImageList.html?SerialID=${serialId}`)
}

// 获取车系的所有车款
export let getModelColor = (serialId: string)=>{
    return request(`v2-car-getModelImageYearColor.html?SerialID=${serialId}`)
}
