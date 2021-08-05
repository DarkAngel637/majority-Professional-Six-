import request from '../../utils/request';

// 获取车系图片
export let getImageList =  (params: {[key: string]: string})=>{
    return request(`v2-car-getImageList.html`, {
        params, // params表示query string
        // data: {}    // data表示请求体
    })
}

// 获取车系的所有车款
export let getModelColor = (serialId: string)=>{
    return request(`v2-car-getModelImageYearColor.html?SerialID=${serialId}`)
}
