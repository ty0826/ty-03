import Request from '@/api'
import { Promise } from 'core-js'
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
}
const mutations = {
    getMessage(state, data) {
        state.code = data
    },
    getLogin(state, data) {
        state.token = data
    },
    getToken(state, data) {
        state.userInfo = data
    },
    getLoginout(state) {
        //清空数据
        state.userInfo = {}
        state.token = ""
            //删除token
        localStorage.removeItem('TOKEN')
    }
}
const actions = {
    //获取验证码
    async getMessage({ commit }, phone) {
        let result = await Request.getMessage(phone)
        if (result.code == 200) {
            commit('getMessage', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async getRegister({ commit }, user) {
        let result = await Request.getRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('注册失败'))
        }
    },
    //用户登录
    async getLogin({ commit }, user) {
        let result = await Request.getLogin(user)
        if (result.code == 200) {
            commit('getLogin', result.data.token)
                //本地存储token
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('账号或密码错误'))
        }
    },
    //获取信息
    async getToken({ commit }) {
        let result = await Request.getToken()
        if (result.code == 200) {
            commit('getToken', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async getLoginout({ commit }) {
        let result = await Request.getLoginout()
        if (result.code == 200) {
            commit('getLoginout')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}