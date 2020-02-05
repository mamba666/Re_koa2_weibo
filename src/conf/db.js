/**
 * @description 数据库的连接配置。因为数据库有线上线下，所以会有多种port、host等
 * @description 将他们放在一起会容易管理，改动也更方便
 * @module /utils/env
 * @author edison
 */

const {isProd}=require("../utils/env")

//配置数据库
let REDIS_CONF={
    port:6379,
    host:"127.0.0.1"
}


//判断线上还是线下，以选择使用何种配置数据库
if(isProd){
    REDIS_CONF={
        port:6379,
        host:"127.0.0.1"
    }
}

module.exports={
    REDIS_CONF
}
