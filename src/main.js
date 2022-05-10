import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入mock
import '@/mock/mock'
//引入swiper样式,轮播图
import 'swiper/css/swiper.css'
//三级联动组件
import TpyeNav from '@/components/TypeNav'
//分页组件
import Pagination from '@/components/pagination/index.vue'
Vue.component('TpyeNav', TpyeNav)
Vue.component('Pagination', Pagination)
    //引入全局接口
import * as api from '@/api'
//导入element组件
import { MessageBox } from 'element-ui';
//注册组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
    //图片懒加载
import VueLazyload from 'vue-lazyload'
//注册
Vue.use(VueLazyload, {
        loading: './assets/1638926914804-4.jpg',
    })
    //引入验证插件
import '@/views/plugin/validate'
new Vue({
    router,
    store,

    beforeCreate() {
        //配置全局控制组件
        Vue.prototype.$bus = this
            //配置全局接口
        Vue.prototype.$api = api
    },

    render: (h) => h(App)
}).$mount('#app')