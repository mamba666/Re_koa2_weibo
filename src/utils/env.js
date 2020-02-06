/**
 * @description 专门用来判断环境：线上或者线下等
 * @author edison
 */

// process.env.NODE_ENV可以获取到环境变量：dev,prd等等
const ENV=process.env.NODE_ENV



module.exports={
    isDev:ENV==="dev",
    notDev:ENV!=="dev",
    isProd:ENV==="production",
    notProd:ENV!=="production",
    isTest:ENV==="test",
    notTest:ENV!=="test",
}