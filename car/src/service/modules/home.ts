import request from '../../utils/request';

// 获取首页品牌列表
export let getBrandList = ()=>{
    return request('/v2-car-getMasterBrandList.html')
}

// 获取车系列表
export let getSerialList = (masterId: string)=>{
    return request(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${masterId}`)
}
