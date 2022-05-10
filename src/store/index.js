import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import home from './home/index'
import sreach from './sreach'
import detail from './detail'
import carList from './carList/index'
import user from './user'
import trade from './trade'
export default new Vuex.Store({
    modules: {
        home,
        sreach,
        detail,
        carList,
        user,
        trade
    }
})