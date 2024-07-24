// 用来获取检测数据的路由
const express = require('express')
const ivtcode_Router = express.Router() //验证邀请码是否正确,并绑定邀请码

// 解决接口的跨越问题
const cors = require('cors')
ivtcode_Router.use(cors())

// 导入路由处理函数
const data_handler = require('../router_handler/ivtode_handler')


ivtcode_Router.post('/ivtcode', data_handler.ivtcode_handler)
module.exports = {
    ivtcode_Router
}