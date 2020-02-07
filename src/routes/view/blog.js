/**
 * @description 微博相关路由  view
 * @author edison
 */

const router = require('koa-router')()
const {loginRedirect}=require("../../middlewares/loginChecks")

// 首页
router.get('/',loginRedirect,async(ctx,next)=>{
    await ctx.render('index',{})
})

module.exports=router