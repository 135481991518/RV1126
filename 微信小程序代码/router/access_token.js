// 获取access_token
// 用来获取检测数据的路由
const express = require('express')
const accessToken_Router = express.Router() //验证邀请码是否正确,并绑定邀请码

// 解决接口的跨越问题
const cors = require('cors')
accessToken_Router.use(cors())

// 导入路由处理函数
const data_handler = require('../router_handler/access_token_handler')


accessToken_Router.get('/accessToken', data_handler.accesstoken_handler)
module.exports = accessToken_Router