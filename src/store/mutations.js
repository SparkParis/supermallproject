import * as types from './mutation-types'
const mutations = {
  // mutation中处理的方法尽量单一,将逻辑处理和异步操作都放在action中
  // 添加购物车数量
  [types.ADD_COUNT](state, index) {
    state.cartList[index].count += 1
  },
  [types.ADD_INFO](state, goods) {
    // 添加选中与否属性
    goods.checked = true
    state.cartList.push(goods)
  }
}
export default mutations