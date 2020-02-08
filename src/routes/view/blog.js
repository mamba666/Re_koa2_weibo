/**
 * @description 微博相关路由  view
 * @author edison
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
// 首页
router.get('/',loginRedirect,async(ctx,next)=>{
    await ctx.render('index',{})
})


//个人主页
// 第一个路由的场景是防止已经登录的人进入个人主页,
// 然后通过session找出这个人的userName,然后进行跳转
router.get('/profile',loginRedirect,async(ctx,next)=>{
    const {userName}=ctx.session.userInfo
    ctx.redirect(`profile/${userName}`)
})
router.get('/profile/:userName',loginRedirect,async(ctx,next)=>{
    // 已登录用户的信息
    const myUserInfo=ctx.session.userInfo
    const myUserName=myUserInfo.userName

    let curUserInfo
    const {userName:curUserName}=ctx.params
    // 如果当前访问用户和已登录用户是一个人,就说明访问的是自己的主页
    const isMe=myUserName===curUserName
    if(isMe){
        curUserInfo = myUserInfo
    }else{
        const existResult=await isExist(curUserName)
        if(existResult.errno!==0){
            return 
        }
        curUserInfo=existResult.data
    }

    // 获取微博第一页数据
    const result=await getProfileBlogList(curUserName,0)
    const {isEmpty,blogList,pageSize,pageIndex,count}=result.data
    await ctx.render('profile',{
        blogData:{
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        },
        userData:{
            userInfo:curUserInfo,
            isMe
        }
    })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports=router