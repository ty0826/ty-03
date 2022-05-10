//sreach库
import Require from '@/api/index'
const state = {
    goodsList: []
}
const mutations = {
    getGoods(state, data) {
        state.goodsList = data
    }
}
const actions = {
    //搜索商品
    async searchGoods({ commit }, params) {
        let result = await Require.getSearchGoods(params)
        if (result.code === 200) {
            commit('getGoods', result.data)
        }

    }
}
const getters = {
    //简化数据
    attrsList(state) {
        return state.goodsList.attrsList
    },
    goodsList(state) {
        return state.goodsList.goodsList
    },
    trademarkList(state) {
        return state.goodsList.trademarkList
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}