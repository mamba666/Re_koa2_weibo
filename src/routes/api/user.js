/**
 * @description user Api 路由
 * @author edison
 */


const router=require('koa-router')()
const {isExist,register,login}=require("../../controller/user")
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

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

module.exports=router