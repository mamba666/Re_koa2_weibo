/**
 * @description 微博数据模型
 * @author edison
 */

const seq = require('../seq')
const { STRING,INTEGER,TEXT } = require('../types')

const Blog=seq.define("blog",{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:"将会与user表的id关联"
    },
    content:{
        type:TEXT,
        allowNull:false
    },
    image:{
        type:STRING
    }
})

module.exports=Blog