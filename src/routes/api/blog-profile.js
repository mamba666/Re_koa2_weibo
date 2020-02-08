/**
 * @description 个人主页 API 路由
 * @author edison
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    // 获取动态参数
    let { userName, pageIndex } = ctx.params
    // parseInt() 函数可解析一个字符串，并返回一个整数。
    pageIndex = parseInt(pageIndex)
    // 进入controller
    const result = await getProfileBlogList(userName, pageIndex)

    // 渲染为 html 字符串
    // result为一个successmodel模板，所以需要使用data
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router