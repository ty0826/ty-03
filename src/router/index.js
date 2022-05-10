import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Sreach from '@/views/Sreach/index.vue'
import Register from '@/views/Register/index.vue'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import Myorder from '@/views/Center/Myorder'
import Alllorder from '@/views/Center/Alllorder'

//导入仓库
import store from '@/store/index'
Vue.use(VueRouter)

//把VueRouter原型对象的push，replace备份一份
let orginPush = VueRouter.prototype.push
let orginReplace = VueRouter.prototype.replace

//重写
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        orginPush.call(this, location, resolve, reject)
    } else {
        orginPush.call(
            this,
            location,
            () => {},
            () => {}
        )
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        orginPush.call(this, location, resolve, reject)
    } else {
        orginPush.call(
            this,
            location,
            () => {},
            () => {}
        )
    }
}

const routes = [
    { path: '/', redirect: '/Home' },
    {
        path: '/Pay',
        component: Pay,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/Trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/Trade',
        component: Trade,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/ShopCart') {
                next()
            } else {
                next(false)
            }
        }
    },
    { path: '/PaySuccess', component: PaySuccess, meta: { show: true } },
    {
        path: '/Center',
        component: Center,
        meta: { show: true },
        children: [
            { path: 'Myorder', component: Myorder },
            { path: 'Alllorder', component: Alllorder },
            { path: '/Center', redirect: '/Center/Myorder' }
        ]
    },
    { path: '/Detail/:detailId', component: Detail, meta: { show: true } },
    { path: '/Home', component: Home, meta: { show: true } },
    { path: '/ShopCart', component: ShopCart, meta: { show: true } },
    { path: '/AddCartSuccess', component: AddCartSuccess, meta: { show: true } },
    { path: '/Login', component: Login, meta: { show: false } },
    { path: '/Sreach/:keyword?', name: 'sreach', component: Sreach, meta: { show: true } },
    { path: '/Register', component: Register, meta: { show: false } }
]

const router = new VueRouter({
        routes,
        //滚动行为
        scrollBehavior(to, from, savedPosition) {
            // 始终滚动到顶部
            return { y: 0 }
        }
    })
    //全局导航守卫
router.beforeEach(async(to, from, next) => {
    //获取token值，判断跳转
    let tokenValue = store.state.user.token
        //用户信息
    let name = store.state.user.userInfo.name
    if (tokenValue) {
        //存在token，表示已经登陆过
        if (to.path == '/Login' || to.path == '/Register') {
            //登录过还去登录页面
            next('/Home')
        } else {
            //去其他页面
            if (name) {
                //登录有身份信息
                next()
            } else {
                //登录没有身份信息，先获取身份信息
                try {
                    await store.dispatch('getToken')
                    next() //获取身份之后放行
                } catch (error) {
                    //token失效,退出登录
                    await store.dispatch('getLoginout')
                    next('/Login')
                }
            }
        }
    } else {
        // 用户未登录
        let toPath = to.path
            //用户未登录不允许到交易页面，支付页面，个人中心页面
        if (toPath.indexOf('/Trade') != -1 || toPath.indexOf('/Pay') != -1 || toPath.indexOf('/Center') != -1) {
            //加入query参数，判断跳转页面
            next('/Login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router