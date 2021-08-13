import { request } from 'umi';

// 获取文章列表
export function getArticleList(page: number, pageSize=12, status='publish'){
    return request('/api/article', {
        params: {
            page,
            pageSize,
            status,
        }
    })
}

// 获取推荐文章
export function getRecommend(){
    return request('/api/article/recommend')
}