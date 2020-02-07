/**
 * @description user controller
 * @author edison
 */

const {getUserInfo,createUser,deleteUser,updateUser}=require("../services/user")
const {SuccessModel,ErrorModel}=require("../model/ResModel")
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
}=require("../model/ErrorInfo")
const doCrypto=require("../utils/cryp")

/**
 * 查询数据库所以要用异步操作
 * @param {string} userName 
 * @description 用户名是否存在
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // { errno: 0, data: {....} }
        return new SuccessModel(userInfo)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册
 * @param {string|number} param0 userName,password,gender
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    // 防止前端不用isExist,同时在db/model/user.js中也做了这样的操作
    // 以防万一，多保险，提高用户体验
    // 同时这里也是controller层的业务逻辑
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    // 注册  services
    // 因为需要插入数据，保险起见使用一个try..catch..

    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param {Object} ctx koa2的ctx参数
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
        //登录成功之后 ctx.session.userInfo 赋值为用户信息
        // 获取用户信息
        const userInfo = await getUserInfo(userName, doCrypto(password))
        if (!userInfo) {
            // 登录失败
            return new ErrorModel(loginFailInfo)
        }
    
        // 登录成功
        if (ctx.session.userInfo == null) {
            ctx.session.userInfo = userInfo
        }
        return new SuccessModel()
    }

/**
 * 删除用户
 * @param {string} userName 通过session获取的当前用户
 */
async function deleteCurUser(userName) {
        // 因为删除时已经登录了，所以不需要获取用户信息
        const result = await deleteUser(userName)
        if (result) {
            // 成功
            return new SuccessModel()
        }
        // 失败
        return new ErrorModel(deleteUserFailInfo)
    }

/**
 * 修改用户信息
 * @description ctx传进来是因为修改了用户信息也需要更改session
 * @param {Object} ctx 
 * @param {string} param1 nickName,city,picture
 */
async function changeInfo(ctx,{nickName,city,picture}){
    // 既然是修改个人信息,那么也需要知道修改的是谁的个人信息
    // controller的业务逻辑
    const {userName}=ctx.session.userInfo
    if(!nickName){
        nickName=userName
    }
    // services 修改数据库
    const result=await updateUser(
        {
            newNickName:nickName,
            newCity:city,
            newPicture:picture
        },
        {userName}
    )
    if(result){
        //修改存储用户信息的session
        Object.assign(ctx.session.userInfo,{
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @description 修改密码和修改信息都是修改,而修改基本信息获取userName是为了在数据库操作时传入一个执行的条件
 * @param {string} userName 
 * @param {string} password 
 * @param {string} newPassword 
 */
async function changePassword(userName,password,newPassword){
    const result=await updateUser(
        {
            //修改的内容
            newPassword:doCrypto(newPassword)
        },
        {
            // 执行的条件
            userName,
            password:doCrypto(password)
        }
    )
    if(result){
        return new SuccessModel
    }
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @description 核心逻辑就是删除session
 * @param {Object} ctx 
 */
async function logout(ctx){
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports={
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}