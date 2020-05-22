// 封装request请求
import axios from 'axios';

export function request(config) {
  // 1.创建axios实例对象
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  });
  // 拦截器
  // 2.1 请求拦截器的作用
  instance.interceptors.request.use(config => {
    return config
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    // 每次拦截之后才做之后必须返回才能执行后续操作,这里将返回的response中的data数据过滤出来返回
    return res.data
  })
  // 发送请求
  return instance(config)
}
