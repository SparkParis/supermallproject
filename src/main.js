import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入懒加载插件
import LazyLoad from 'vue-lazyload'

//安装插件
Vue.use(LazyLoad, {
  loadind: require('assets/img/common/placeholder.png')
})

Vue.config.productionTip = false
// 添加事件总线在全局中添加,new一个vue实例作为事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
