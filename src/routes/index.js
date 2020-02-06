const router = require('koa-router')()

const {loginRedirect, loginCheck}=require("../middlewares/loginChecks")

router.get('/',loginRedirect,async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe:true,
    blogList:[
      {
        id:1
      },
      {
        id:2
      },
      {
        id:3
      }
    ]
  })
})

router.get('/json',loginCheck,async (ctx, next) => {
  // ctx.session就可以获取当前用户进入json页面的session
  // ctx.session中初始只存了cookie，所以可以调用ctx.session.cookie
  // 这里的ctx.session.viewNum是自己定义的一个session属性
  // const session=ctx.session

  // 使用session做访问量
  // if(session.viewNum==null){
  //   session.viewNum=0
  // }
  // const viewNum=session.viewNum++
  ctx.body = {
    title: 'koa2 json'
    // viewNum
  }
})

router.get("/profile/:userName",async (ctx, next) => {
  const {userName}=ctx.params
  ctx.body = {
    title: 'koa2 json',
    userName,
    ctx
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const {userName,pageIndex}=ctx.params
  ctx.body = {
    title: 'koa2 json',
    userName,
    pageIndex
  }
})

module.exports = router
