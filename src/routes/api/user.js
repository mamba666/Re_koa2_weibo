/**
 * @description user Api 路由
 * @author edison
 */


const router=require('koa-router')()

router.prefix('api/user')


router.post('/register',async(ctx,next)=>{

})

/**
 * @description 用户名是否存在，前端传进来的是userName
 */
router.post('/isExist',async(ctx,next)=>{
    const {userName}=ctx.request.body
    
})

module.exports=router