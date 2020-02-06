/**
 * @description 单元测试db/model/index(user)，目的是看user中是否有model中定义的属性
 * @author edison
 */

const {User}=require("../../src/db/model/index")

test("user中属性是否符合当初定义的预期",()=>{
    // build会构建一个内存的User实例，但不会提交到数据库
    const user=User.build({
        userName:"edison",
        password:"123",
        nickName:"edison",
        picture:"/xxx.png",
        city:"唐山"
    })
    expect(user.userName).toBe("edison")
    expect(user.password).toBe("123")
    expect(user.nickName).toBe("edison")
    expect(user.picture).toBe("/xxx.png")
    expect(user.city).toBe("唐山")
})