/**
 * @description user services
 * @author edison
 */

// 引用用户数据模型
const {User}=require("../db/model/index")
const {formatUser}=require("./_format")


/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}

/**
 * 创建用户
 * @description 因为这里是services层，所以只要管好数据层面就行，这也是为社么传入这么参数的原因
 * @param {string|number} param0 userName,password,gender,nickName
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        // 防止不传昵称
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName 数据库层面删除用户
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result 删除的行数
    // 返回一个boolean
    return result > 0
}


module.exports={
    getUserInfo,
    createUser,
    deleteUser
}