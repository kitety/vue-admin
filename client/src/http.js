import axios from 'axios'
import { Loading, Message } from 'element-ui'
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
  return Promise.reject(error)
})
export default axios
