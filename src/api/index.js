//配置接口
import mock from './mock'
import request from './Request'
const Request = {
    // /api/product/getBaseCategoryList,三级联动
    getBaseCategoryList() {
        return request.get('/product/getBaseCategoryList')
    },
    //banner区域
    getbannerList() {
        return mock.get('/banner')
    },
    // floor区域
    getFloorList() {
        return mock.get('/floor')
    },
    //搜索商品
    getSearchGoods(params) {
        return request({ url: '/list', method: 'post', data: params })
    },
    //商品详情
    getDetail(skuId) {
        return request({ url: `/item/${skuId}`, method: 'get' })
    },
    //添加购物车/api/cart/addToCart/{ skuId }/{ skuNum }
    addShopcar(skuId, skuNum) {
        return request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
    },
    //购物车列表/api/cart/cartList
    getCarlist() {
        return request({ url: '/cart/cartList', method: 'get' })
    },
    //删除购物车列表/api/cart/deleteCart/{skuId}
    delectCar(skuId) {
        return request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
    },
    //切换商品勾选状态/api/cart/checkCart/{skuID}/{isChecked}
    changeStastu(skuId, isChecked) {
        return request({ url: `/cart/checkCart/${skuId}/${isChecked}` })
    },
    //获取验证码/api/user/passport/sendCode/{phone}
    getMessage(phone) {
        return request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
    },
    //注册用户/api/user/passport/register
    getRegister(data) {
        return request({ url: '/user/passport/register', data, method: 'post' })
    },
    //登录页面/api/user/passport/login
    getLogin(data) {
        return request({ url: '/user/passport/login', data, method: 'post' })
    },
    //获取token的信息/user/passport/auth/getUserInfo
    getToken() {
        return request({ url: '/user/passport/auth/getUserInfo', method: 'get' })
    },
    //退出登录/user/passport/logout
    getLoginout() {
        return request({ url: '/user/passport/logout', method: 'get' })
    },
    //获取用户地址信息
    getAddress() {
        return request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
    },
    //获取的名单详情/order/auth/trade
    getOeder() {
        return request({ url: '/order/auth/trade', method: 'get' })
    },
    //提交订单
    submitList(tradeNo, data) {
        return request({ url: `/order/auth/submitOrder/?tradeNo=${tradeNo}`, data, method: 'post' })
    },
    //获取订单信息
    getOrderMessage(orderId) {
        return request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
    },
    //订单状态
    getOrderStatus(orderId) {
        return request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
    },
    //获取订单列表
    getOrderLists(page, limit) {
        return request({ url: `/order/auth/${page}/${limit}`, method: 'get' })
    }
}
export default Request