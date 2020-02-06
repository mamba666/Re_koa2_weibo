/**
 * @description user Api 路由
 * @author edison
 */


const router=require('koa-router')()
const {isExist}=require("../../controller/user")

router.prefix('/api/user')


router.post('/register',async(ctx,next)=>{

})

/**
 * @description 用户名是否存在，前端传进来的是userName
 */
router.post('/isExist',async(ctx,next)=>{
    console.log("routes/api/user")
    const {userName}=ctx.request.body
    console.log("routes/api/user",userName)
    ctx.body=await isExist(userName)
})

module.exports=router