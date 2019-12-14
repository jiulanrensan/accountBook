import axios from 'axios';
import vue from '../main';

let axiosIns = axios.create({});

axiosIns.defaults.baseURL = 'api'
let loading = null

// 添加请求拦截器
axiosIns.interceptors.request.use(function (config) {
  // Do something before request is sent
  // vue.$pagoda.loading.start();
  loading = vue.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  })
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加响应拦截器
axiosIns.interceptors.response.use(function (response) {
  // Do something with response data
  // vue.$pagoda.loading.done();
  loading.close()
  if (response.data.succ) {
    console.log(response)
    return response.data.data
  } else {
    vue.$message.error(response.data.msg);
    return Promise.reject(response);
  }
}, function (error) {
  // Do something with response error
  // vue.$pagoda.loading.done();
  loading.close()
  return Promise.reject(error);
});

export default axiosIns;