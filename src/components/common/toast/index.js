import Toast from './Toast'

const plugin = {}
// 安装插件中的install函数会默认传入Vue对象
plugin.install = function (Vue) {
  // 1.利用Toast对象创建组件构造器
  const constructor = Vue.extend(Toast);
  // 2.根据组件构造器创建组件对象
  const toast = new constructor();
  //3.将组件对象手动挂载到dom元素上
  toast.$mount(document.createElement('div'));
  // 4.将创建的dom元素添加到body中
  document.body.appendChild(toast.$el);
  // 5.将toast添加到Vue原型中
  Vue.prototype.$toast = toast;
}
export default plugin