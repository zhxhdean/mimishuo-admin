import axios from 'axios'



const instance = axios.create({
  baseURL: 'http://140.143.223.43:8090', //'http://localhost:3000' 'https://api.mimishuo.com',
  withCredentials: true,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(function(config){
  // 动态增加一些配置

  console.log(config)
  return config
}, function(err){
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(function(response){
  // todo 统一判断是否登录后，做跳转登录页面
  if(response.status === 200){
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

export {
  get,
  post,
  del
}