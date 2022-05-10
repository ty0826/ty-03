//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//引入store文件
import store from '@/store'
const request = axios.create({
        //配置基础对象
        baseURL: '/api',
        timeout: 5000
    })
    //添加请求拦截器
request.interceptors.request.use((config) => {
        if (store.state.detail.uuidToken) {
            //在请求头添加临时token
            config.headers.userTempId = store.state.detail.uuidToken
        }
        if (store.state.user.token) {
            //在请求头添加用户token
            config.headers.token = store.state.user.token
        }
        nprogress.start()
        return config
    })
    //添加响应拦截器
request.interceptors.response.use((res) => {
        //响应成功
        nprogress.done()
        return res.data
    }),
    (error) => {
        //响应失败
        return Promise.reject(new Error('faile'))
    }

//向外暴露
export default request