/**
 * @description user Api 路由
 * @author edison
 */


const router=require('koa-router')()
const {isExist,register}=require("../../controller/user")

router.prefix('/api/user')


router.post('/register',async(ctx,next)=>{
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

module.exports=router