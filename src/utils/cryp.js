/**
 * @description 加密方法
 * @author edison
 */

const crypto=require("crypto")
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')


/**
 * md5加密  工具函数
 * @param {string} content 明文-即用户输入的密码
 * @description hex为16进制
 */
function _md5(content){
    const md5=crypto.createHash("md5")
    return md5.update(content).digest("hex")
}

/**
 * 调用_md5()并且返回
 * @param {string} content 明文-即用户输入的密码
 */
function doCrypto(content){
    const str=`password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports=doCrypto