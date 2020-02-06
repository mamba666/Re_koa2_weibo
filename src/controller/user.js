/**
 * @description user controller
 * @author edison
 */

const {getUserInfo,createUser,deleteUser}=require("../services/user")
const {SuccessModel,ErrorModel}=require("../model/ResModel")
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo
}=require("../model/ErrorInfo")
const doCrypto=require("../utils/cryp")

/**
 * 查询数据库所以要用异步操作
 * @param {string} userName 
 * @description 用户名是否存在
 */
async function isExist(userName){
    console.log("controller/user",getUserInfo)
    const userInfo=await getUserInfo(userName)
    if(userInfo){
        //存在
        return new SuccessModel(userInfo)
    }else{
        //不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册
 * @param {string|number} param0 userName,password,gender
 */
async function register({userName,password,gender}){
    const userInfo=await getUserInfo(userName)
    // 防止前端不用isExist,同时在db/model/user.js中也做了这样的操作
    // 以防万一，多保险，提高用户体验
    // 同时这里也是controller层的业务逻辑
    if(userInfo){
        return ErrorModel(registerUserNameExistInfo)
    }

    //注册  services
    // 因为需要插入数据，保险起见使用一个try..catch..
    try{
        await createUser({
            userName,
            password:doCrypto(password),
            gender
        })
        return new SuccessModel()
    }catch(ex){
        console.error(ex.message,ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param {Object} ctx koa2的ctx参数
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx,userName,password){
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
async function deleteCurUser(userName){
    // 因为删除时已经登录了，所以不需要获取用户信息
    const result=await deleteUser(userName)
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

module.exports={
    isExist,
    register,
    login,
    deleteCurUser
}