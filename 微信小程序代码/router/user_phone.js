// 绑定手机号码
const express = require('express')
const userInfo_phone_Router = express.Router()

// 解决接口的跨越问题
const cors = require('cors')
userInfo_phone_Router.use(cors())

const user_handler = require('../router_handler/phone_handler')
// 导入路由处理函数,判断是否存在这个账号,这是登录的页面
userInfo_phone_Router.post('/userInfo_phone', user_handler.user_handler)

module.exports = userInfo_phone_Router