import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from './router'

let loading = null
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '正在加载中...',
    background: 'rgba(0,0,0,0.7)'
  })
}
function endLoading () {
  loading.close()
}
// 请求拦截
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  startLoading()
  if (localStorage.eleToken) {
    // 设置请求头
    config.headers.Authorization = localStorage.eleToken
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  endLoading()
  return response
}, function (error) {
  endLoading()
  Message.error(error.response.data)
  // 获取错误状态吗
  const { status } = error.response
  if (status === 401) {
    Message.error('登陆信息已经过期,请重新登录')
    localStorage.removeItem('eleToken')
    // 跳转到登录
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
