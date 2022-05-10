//home库
//测试
import Request from '@/api'

const state = {
    getNavlist: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    getNavlist(state, data) {
        state.getNavlist = data
    },
    getbannerList(state, data) {
        state.bannerList = data
    },
    getFloor(state, data) {
        state.floorList = data
    }
}
const actions = {
    //发起请求
    async getNavlist({ commit }) {
        let result = await Request.getBaseCategoryList()
        if (result.code === 200) {
            commit('getNavlist', result.data.slice(0, 16))
        }
    },
    //banner区域发起请求
    async getbannerList({ commit }) {
        let result = await Request.getbannerList()
        if (result.code === 200) {
            commit('getbannerList', result.data)
        }
    },
    //floor区域发起请求
    async getList({ commit }) {
        let result = await Request.getFloorList()
        if (result.code === 200) {
            commit('getFloor', result.data)
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