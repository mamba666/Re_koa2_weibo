/**
 * @description 对微博数据进行处理  services
 * @author edison
 */


const {Blog}=require("../db/model/index")


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

module.exports={
    createBlog
}