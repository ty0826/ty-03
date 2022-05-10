import Require from '@/api/index'
const state = {
    addressList: [],
    shopOrder: {}
}
const mutations = {
    getAddress(state, data) {
        state.addressList = data
    },
    getOeder(state, data) {
        state.shopOrder = data
    }
}
const actions = {
    //获取地址信息
    async getAddress({ commit }) {
        let result = await Require.getAddress()
        if (result.code == 200) {
            commit('getAddress', result.data)
        }
    },
    //获取订单信息
    async getOeder({ commit }) {
        let result = await Require.getOeder()
        if (result.code == 200) {
            commit('getOeder', result.data)
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