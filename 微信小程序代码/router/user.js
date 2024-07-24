// 保存用户的登录信�?
const express = require('express')
const userInfo_Router = express.Router()
const userInfo_Router_1 = express.Router()
// 解决接口的跨越问�?
const cors = require('cors')
userInfo_Router.use(cors())
userInfo_Router_1.use(cors())
const user_handler = require('../router_handler/user_handler')
// 导入路由处理函数,判断是否存在这个账号,这是登录的页�?
userInfo_Router.post('/userInfo', user_handler.user_handler)
userInfo_Router.post('/usertime', user_handler.user_handler)
module.exports = {
  userInfo_Router,userInfo_Router_1
}