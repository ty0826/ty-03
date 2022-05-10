import Request from '@/api'
import { getUuid } from '@/views/uuid/index'
const state = {
    detailList: {},
    //临时游客身份
    uuidToken: getUuid()
}
const mutations = {
    getDetail(state, data) {
        state.detailList = data
    }
}
const actions = {
    //获取详情数据
    async getDetail({ commit }, skuId) {
        let result = await Request.getDetail(skuId)
        if (result.code === 200) {
            commit('getDetail', result.data)
                // console.log(result.data);
        }
    },
    //添加购物车,async返回的事promise函数
    async addShopcars({ commit }, { skuId, skuNum }) {
        let result = await Request.addShopcar(skuId, skuNum)
        if (result.code == 200) {
            //请求成功
            return "ok"
        } else {
            //请求失败
            return Promise.reject(new Error('faile'))
        }
    },

}
const getters = {
    //路由信息
    categoryView(state) {
        return state.detailList.categoryView || {}
    },
    //图片信息
    skuInfo(state) {
        return state.detailList.skuInfo || {}
    },
    //样式信息
    spuSaleAttrList(state) {
        return state.detailList.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}