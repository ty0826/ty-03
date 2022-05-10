import { v4 as uuidv4 } from 'uuid'
//随机生成一个字符串，且每次执行不会发生改变
export const getUuid = () => {
    let tokens = localStorage.getItem('GTEUUID')
        //如果本地并没有存储
    if (!tokens) {
        //随机生成一个临时登录身份
        let localToken = uuidv4()
        localStorage.setItem('GTEUUID', localToken)
    }
    return tokens
}