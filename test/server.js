/**
 * @description 使用supertest测试http请求
 * @author edison
 */

const request=require("supertest")
const server=require("../src/app").callback()

module.exports=request(server)

