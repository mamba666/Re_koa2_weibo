/**
 * @description 首页API路由
 * @author edison
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')


// 创建微博
router.post('/create',loginCheck,async(ctx,next)=>{
    const {content,image}=ctx.request.body
    const {id:userId}=ctx.session.userInfo
    ctx.body=await create({content,image,userId})
})

module.exports=router