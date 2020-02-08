const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const {REDIS_CONF}=require("./conf/db")
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// const squareAPIRouter = require('./routes/api/blog-square')
const profileAPIRouter = require('./routes/api/blog-profile')
const homeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
// 将uploadFiles当作静态文件见去处理
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//koa2配置session
//session如果不手动去使用的话，就不会去启用redis服务器
//这是密钥，因为需要将cookie传进来的信息加密
app.keys=[SESSION_SECRET_KEY]
app.use(session({
  //设置cookie的name，默认是koa.sid
  key:"weibo.sid",
  //设置redis key的前缀，默认是koa:sess:
  prefix:"weibo:sess:",
  //配置cookie
  cookie:{
    // 表示生成的cookie的路径，这里表示在所有根路径下
    path:"/",
    httpOnly:true,
    // 单位：毫秒--过期时间
    maxAge:24*60*60*1000
  },
  // ttl:24*60*60*1000,  ttl是redis过期配置，如果不写默认和maxAge一样
  store:redisStore({
    // redis的配置
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))


// routes
// app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最后面
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
