/**
 * @description utils API 路由
 * @author edison
 */

const router = require('koa-router')()
const {loginCheck}=require("../../middlewares/loginChecks")
const koaForm = require("formidable-upload-koa");
const {saveFile}=require("../../controller/utils")

router.prefix('/api/utils')

const options = {
    uploadDir: `${__dirname}/`,
    keepExtensions: true
};
// 上传图片
router.post('/upload',loginCheck,koaForm(options),async(ctx,next)=>{
    // file是my-ajax里面自己定义的
    const file=ctx.req.files['file']
    if(!file){
        return
    }
    const {size,path,name,type}=file

    ctx.body=await saveFile({
        name,
        type,
        size,
        filePath:path
    })
})

module.exports=router