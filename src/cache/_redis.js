/**
 * @description 连接redis的方法--get  set
 * @module conf/db.js
 * @module redis
 * @author edison
 */

const redis=require("redis")
const REDIS_CONF=require("../conf/db")

//创建redis客户端
const redisClient=redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on("error",err=>{
    console.error("redis error",err)
})

/**
 * redis set
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 单位：秒
 * @description set进去的全部设置为字符串形式
 */
function set(key,val,timeout=60*60){
    if(typeof val==="object"){
        //变成字符串类型
        val=JSON.stringify(val)
    }
    redisClient.set(key.val)
    redisClient.expire(key,timeout)
}

/**
 * redis get
 * @param {string} key 
 */
function gey(key){
    const promise=new promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if(val==null){
                resolve(null)
                return
            }
            try{
                // 万一是json类型
                resolve(
                    JSON.parse(val)
                )
            }catch(ex){
                resolve(val)
            }
        })
    })
    return promise
}

module.exports={
    set,
    get
}