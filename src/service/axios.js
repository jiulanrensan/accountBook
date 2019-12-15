import axios from 'axios';
import vue from '../main';

let axiosIns = axios.create({});

axiosIns.defaults.baseURL = '/'
let loading = null

// console.log(vue)
// 添加请求拦截器
axiosIns.interceptors.request.use(function (config) {
  // Do something before request is sent
  // vue.eventBus.$emit('loading', true)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加响应拦截器
axiosIns.interceptors.response.use(function (response) {
  // Do something with response data
  // loading.close()
  // vue.eventBus.$emit('loading', false)
  // console.log(response)
  if (response.data.code === 0) {
    return response.data
  } else {
    // vue.$message.error(response.data.msg);
    return Promise.reject(response);
  }
}, function (error) {
  // Do something with response error
  // loading.close()
  // vue.eventBus.$emit('loading', false)
  return Promise.reject(error);
});

export default axiosIns;