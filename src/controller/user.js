/**
 * @description user controller
 * @author edison
 */

const {getUserInfo}=require("../services/user")
const {SuccessModel,ErrorModel}=require("../model/ResModel")
const {
    registerUserNameNotExistInfo
}=require("../model/ErrorInfo")

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

module.exports={
    isExist
}