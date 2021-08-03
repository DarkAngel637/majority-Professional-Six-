import request from '../../utils/request';

// 获取车款详情
export let getSerialInfo = (serialId: string)=>{
    return request(`/v2-car-getInfoAndListById.html?SerialID=${serialId}`)
}
