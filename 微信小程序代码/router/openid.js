// 用来获取检测数据的路由
const express = require('express')
const request = require('request')
const openid_Router = express.Router() //验证邀请码是否正确,并绑定邀请码

// 解决接口的跨越问题
const cors = require('cors')
openid_Router.use(cors())

// 导入路由处理函数
const data_handler = require('../router_handler/openid_handler')


openid_Router.get('/openid', data_handler.openid_handler)
module.exports = openid_Router