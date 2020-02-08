/**
 * @description 个人主页
 * @author edison
 */

const {getBlogListByUser}=require("../services/blog")
const {SuccessModel,ErrorModel}=require("../model/ResModel")

/**
 * 获取个人主页微博列表
 * @param {string} userName 
 * @param {number} pageIndex 第几页 默认第一页
 */
async function getProfileBlogList(userName,pageIndex=0){
    const result=await getBlogListByUser({
        userName,
        pageIndex,
        pageSize:5
    })
    const blogList=result.blogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty:blogList.length===0,
        blogList,
        pageSize:5,
        pageIndex,
        count:result.count
    })
}

module.exports={
    getProfileBlogList
}