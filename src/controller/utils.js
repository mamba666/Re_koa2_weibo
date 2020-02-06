/**
 * @description utils controller
 * @author edison
 */

const path=require("path")
const {uploadFileSizeFailInfo}=require("../model/ErrorInfo")
const {SuccessModel,ErrorModel}=require("../model/ResModel")
const fse=require("fs-extra")

// 存储目录
const DIST_FOLDER_PATH=path.join(__dirname,"..","..","uploadFiles")

// 文件最大体积：1M
const MAX_SIZE=1024*1024*1024

/**
 * 保存文件
 * @param {string|number} param0 
 */
async function saveFile({size,filePath,name,type}){
    if(size>MAX_SIZE){
        //先删除文件，因为图片已经通过koaForm(options)中间件上传到服务器了
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    // 成功的时候，将图片移动到想要的地方
    // Date.now()+"."防止重名的时候被覆盖掉
    const fileName=Date.now()+"."+name
    // distFilePath就是当前路径加文件名
    const distFilePath=path.join(DIST_FOLDER_PATH,fileName)
    // 开始移动文件
    await fse.move(filePath,distFilePath)

    // 返回信息  `/1.png`
    return new SuccessModel({
        url:"/"+fileName
    })

}

module.exports={
    saveFile
}