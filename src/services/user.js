/**
 * @description user services
 * @author edison
 */

// 引用用户数据模型
const {User}=require("db/model/index")


/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 * @description 不只是用于isExist
 */
async function getUserInfo(userName,password){
    //查询条件
    const whereOpt={
        userName
    }
    if(password){
        Object.assign(whereOpt,{password})
    }

    //查询
    const result=await User.findOne({
        attributes:["id","userName","nickName","picture","city"],
        where:whereOpt
    })
    if(result==null){
        //未找到
        return result
    }

    //格式化处理

    return result.dataValues
}

module.exports=getUserInfo