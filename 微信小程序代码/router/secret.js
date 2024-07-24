// 用来获取检测数据的路由
const express = require('express')
const secret_Router = express.Router()

// 解决接口的跨越问题
const cors = require('cors')
secret_Router.use(cors())

// 导入路由处理函数
const data_handler = require('../router_handler/secret_handler')


secret_Router.post('/secret', data_handler.secret_handler)
module.exports = secret_Router
