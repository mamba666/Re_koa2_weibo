/**
 * @description user Api 路由
 * @author edison
 */


const router = require('koa-router')()
const { isExist, register, login, deleteCurUser,changeInfo,changePassword } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')


router.post('/register',genValidator(userValidate),async(ctx,next)=>{
    const {userName,password,gender}=ctx.request.body
    ctx.body=await register({
        userName,
        password,
        gender
    })
})

/**
 * @description 用户名是否存在，前端传进来的是userName
 */
router.post('/isExist',async(ctx,next)=>{
    const {userName}=ctx.request.body
    ctx.body=await isExist(userName)
})

router.post('/login',async(ctx,next)=>{
    const {userName,password}=ctx.request.body
    ctx.body=await login(ctx,userName,password)
})

//单元测试用
router.post('/delete', loginCheck,async(ctx,next)=>{
    // 必须要判断是否为线上环境
    if(isTest){
        const {userName}=ctx.session.userInfo
        ctx.body=await deleteCurUser(userName)
    }
})

// 修改个人信息
router.patch('/changeInfo',loginCheck,genValidator(userValidate),async(ctx,next)=>{
    const {nickName,city,picture}=ctx.request.body
    ctx.body=await changeInfo(ctx,{nickName,city,picture})
})

//修改密码
router.patch('/changePassword',loginCheck,genValidator(userValidate),async(ctx,next)=>{
    // 两种方式都可以
    const {password,newPassword}=ctx.request.body
    const {userName}=ctx.session.userInfo
    ctx.body=await changePassword(userName,password,newPassword)
})

module.exports=router