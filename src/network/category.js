// 获取目录的请求数据
import { request } from 'network/request'

// 1.获取目录信息
export function getCategory() {
  return request({
    url: 'category'
  })
}

// 2.获取子目录信息
export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
// 3.获取目录详细信息
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}