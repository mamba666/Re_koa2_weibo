/**
 * @description 登录验证的中间件   api中间件
 * @author edison
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API 登录、注册的校验
 * @description 与loginRedirect不同，这里是开发用的，另外一个是给用户看的，提高用户体验
 * @param {Object} ctx ctx
 * @param {fun} next next
 */
async function loginCheck(ctx,next){
    //如果判断为真，说明在controller中已经登录成功了。
    // 为了安全起见，做两层校验
    if(ctx.session&&ctx.session.userInfo){
        await next()
        return
    }
    //未登录
    ctx.body=new ErrorModel(loginCheckFailInfo)

}

/**
 * 页面 登录校验
 * @description 如果没有登录，当用户访问其他页面路由时，会通过这个中间件实现跳转。
 * @description 比如说访问json，就直接跳转到http://localhost:3000/login?url=%2Fjson
 * @param {Object} ctx 
 * @param {fun} next 
 */
async function loginRedirect(ctx,next){
    if(ctx.session&&ctx.session.userInfo){
        await next()
        return
    }
    //未登录
    const curUrl=ctx.url
    ctx.redirect("/login?url="+encodeURIComponent(curUrl))
}


module.exports={
    loginCheck,
    loginRedirect
}