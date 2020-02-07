/**
 * @description 时间相关的工具函数
 * @author edison
 */

const { format } = require('date-fns')


/**
 * 格式化的时间  比如02.07 14:40
 * @param {string} str 时间的字符串
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
    timeFormat
}