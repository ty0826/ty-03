import Request from '@/api'
const state = {
    carList: []
}
const mutations = {
    getCarlist(state, data) {
        state.carList = data
    }
}
const actions = {
    //获取购物车列表
    async getCarlist({ commit }) {
        let result = await Request.getCarlist()
        if (result.code == 200) {
            commit('getCarlist', result.data)
        }
    },
    //删除列表
    async delectCar({ commit }, skuId) {
        let result = await Request.delectCar(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //改变状态
    async changeStastu({ commit }, { skuId, isChecked }) {
        let result = await Request.changeStastu(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除选中商品
    delectAllshops({ dispatch, getters }) {
        let Promises = [];
        //contex包含{getters: {…}, state: {…}, rootGetters: {…}, dispatch: ƒ, commit: ƒ, …}，结构赋值
        getters.carLists.cartInfoList.forEach(item => {
                //循环遍历每一项，若isChecked == 1则调用删除列表一次
                let promise = item.isChecked == 1 ? dispatch('delectCar', item.skuId) : ''
                Promises.push(promise) //将返回的数组整合
            })
            //返回成功失败的结果给客户端
        return Promise.all(Promises)
    },
    //改变全部复选框状态
    changeAllstastu({ dispatch, state }, isChecked) {
        let Promises = []
        state.carList[0].cartInfoList.forEach(item => {
                let promise = dispatch('changeStastu', { skuId: item.skuId, isChecked })
                Promises.push(promise)
            })
            //返回状态
        return Promise.all(Promises)
    }
}
const getters = {
    carLists(state) {
        return state.carList[0] || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}