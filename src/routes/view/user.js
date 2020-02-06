/**
 * @description 用户页面--注册、登录
 * @author edison
 */

const router = require('koa-router')()

router.get('/login', async(ctx, next)=>{
    await ctx.render('login',{})
})

router.get('/register', async(ctx, next)=>{
    await ctx.render('register',{})
})


module.exports=router