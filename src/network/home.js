// 面向request.js封装home的网络请求模块
import { request } from 'network/request'

// 1.请求更多数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
// 2.请求goods(需要传入type和page)
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page,
        }
    })

}