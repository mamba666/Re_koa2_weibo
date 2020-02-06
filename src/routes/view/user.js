/**
 * @description 用户页面--注册、登录
 * @author edison
 */

const router = require('koa-router')()

/**
 * 获取登录信息
 * @param {Object} ctx 
 */
function getLogininfo(ctx){
    let data={
        // 默认未登录
        isLogin:false
    }
    const userInfo=ctx.session.userInfo
    if(userInfo){
        data={
            isLogin:true,
            userName:userInfo.userName
        }
    }

    return data
}

router.get('/login', async(ctx, next)=>{
    await ctx.render('login',getLogininfo(ctx))
})

router.get('/register', async(ctx, next)=>{
    await ctx.render('register',getLogininfo(ctx))
})


module.exports=router