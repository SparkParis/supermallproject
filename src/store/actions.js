import * as types from './mutation-types'
const actions = {

  // 接收dspatch分发的请求
  addToCart({ state, commit }, info) {
    // 这里通过包裹promise获取代码执行结果并确定代码执行结束时间
    return new Promise((resolve) => {
      // 1. 查看商品中是否含有已经添加属性
      const oldInfo = state.cartList.find(item => item.iid === info.iid)
      // 如果存在则直接在原先的数量中+1
      if (oldInfo) {
        const index = state.cartList.indexOf(oldInfo);
        commit(types.ADD_COUNT, index);
        resolve(`已添加购物车(x${oldInfo.count})`)
      } else {
        info.count = 1;
        info.checked = true
        commit(types.ADD_INFO, info)
        resolve('购物车添加成功')
      }
      // 不存在,添加到cartList中

    })

  }

}
export default actions