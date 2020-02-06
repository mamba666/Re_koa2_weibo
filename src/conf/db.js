/**
 * @description 数据库的连接配置。因为数据库有线上线下，所以会有多种port、host等
 * @description 将他们放在一起会容易管理，改动也更方便
 * @module /utils/env
 * @author edison
 */
const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'lwjkkkbbb1997',
    port: '3306',
    database: 'koa2_weibo_db'
}

if (isProd) {
    REDIS_CONF = {
        // 线上的 redis 配置
        port: 6379,
        host: '127.0.0.1'
    }

    MYSQL_CONF = {
        // 线上的 mysql 配置
        host: 'localhost',
        user: 'root',
        password: 'lwjkkkbbb1997',
        port: '3306',
        database: 'koa2_weibo_db'
    }
    
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}