/**
 * @description services 格式化
 * @author edison
 */

const {DEFAULT_PICTURE}=("../conf/constant")

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 * @description 不直接输出，而是被formatUser调用
 */
function _formatUserPicture(obj){
    if(obj.picture==null){
        obj.picture=DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个头像
 * @description 传入用户信息 
 */
function formatUser(list){
    if(list=null){
        return list
    }
    if(list instanceof Array){
        // 数组
        return list.map(_formatUserPicture)
    }
    // 单个对象
    return _formatUserPicture(list)
}

module.exports={
    formatUser
}