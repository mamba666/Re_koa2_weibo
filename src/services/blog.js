/**
 * @description 对微博数据进行处理  services
 * @author edison
 */


const {Blog,User}=require("../db/model/index")
const {formatUser,formatBlog}=require("./_format")


/**
 * 创建微博
 * @param {Object} param0 userId,content,image
 */
async function createBlog({userId,content,image}){
    const result=await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 * 根据当前用户获取微博列表
 * @param {Object} param0 
 */
async function getBlogListByUser({userName,pageIndex=0,pageSize=10}){
    // 查询条件
    const userWhereOpt = {}
    if(userName){
        userWhereOpt.userName=userName
    }
    const result=await Blog.findAndCountAll({
        //限制多少条
        limit:pageSize,
        //跳过多少条
        offset:pageSize*pageIndex,
        order:[
            ["id","desc"]
        ],
        include:[
            {
                model:User,
                attributes:[
                    "userName",
                    "nickName",
                    "picture"
                ],
                where:userWhereOpt
            }
        ]
    })
    // result.count 返回所有总数,不考虑分页
    // result.rows 返回第几页，根据前来定义

    // 获取dataValues
    let blogList = result.rows.map(row => row.dataValues)

    //格式化
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })
    return {
        count: result.count,
        blogList
    }
}



module.exports={
    createBlog,
    getBlogListByUser
}