const router = require('koa-router')()

router.get('/', async (ctx, next) => {
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

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
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
