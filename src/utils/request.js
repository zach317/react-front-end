import axios from 'axios'

const request = axios.create({
  timeout: 5000,
  baseURL: '/api',
})

// 添加请求拦截器
request.interceptors.request.use(
  // 在发送请求之前做些什么
  (config) => {
    const token = localStorage.getItem('token')
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  // 对请求错误做些什么
  (error) => Promise.reject(error)
)

// 添加响应拦截器
request.interceptors.response.use(
  // 对响应数据做点什么
  (response) => {
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    return response.data
  },
  // 对响应错误做点什么
  (error) => Promise.reject(error.response.data)
)

export default request
