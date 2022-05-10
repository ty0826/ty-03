//对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
const request = axios.create({
    //配置基础对象
    baseURL: '/mock',
    timeout: 5000,
});
//添加请求拦截器
request.interceptors.request.use(config => {
        nprogress.start()
        return config
    })
    //添加响应拦截器
request.interceptors.response.use(res => {
    //响应成功
    nprogress.done()
    return res.data
}), (error) => {
    //响应失败
    return Promise.reject(new Error('faile'));
}

//向外暴露
export default request