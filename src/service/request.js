/*eslint no-undef: "off"*/ 
import axios from 'axios'
import {message} from 'antd'


const instance = axios.create({
  baseURL: '/management', //'http://localhost:3000' 'https://api.mimishuo.com',
  withCredentials: true,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(function(config){
  // 动态增加一些配置
  if(config.url.includes('aliyuncs.com')){
    //阿里云的oss地址
    config.baseURL = ''
    config.headers['Content-Type'] = 'image/jpeg'
  }
  console.log(config)
  return config
}, function(err){
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(function(response){
  // todo 统一判断是否登录后，做跳转登录页面
  if(response.status === 200){
    if(response.data.errorCode === '10004' || response.data.errorCode === '10001'){
      message.error('登录已超时')
      window.location.href = '/admin/#/login'
      return {data:response.data.data, code: response.data.errorCode || 0, content: response.data.errorMsg || ''}
    }
    return {data:response.data.data, code: response.data.errorCode || 0, content: response.data.errorMsg || ''}
  }
  return response
},function(err){
  return Promise.reject(err)
})

function get (options){
  const {url, data} = options
  const params = {
    params: {
      ...data
    }
  }
  return instance.get(url, params)
}

function post (options){
  const {url, data} = options
  return instance.post(url, data)
}

function del (options){
  const {url} = options
  return instance.delete(url)
}

function put (options){
  const {url, data} = options
  return instance.put(url, data)
}

export {
  get,
  post,
  del,
  put
}