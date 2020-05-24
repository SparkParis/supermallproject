import Vue from 'vue'
import Vuex from 'vuex'
// 安装Vuex插件
Vue.use(Vuex)


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  cartList: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
