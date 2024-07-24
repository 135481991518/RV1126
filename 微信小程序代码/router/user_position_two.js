// 让用户绑定选中的地理数据
// 返回一串可以绑定的地理数据
const express = require('express')
const userPositiontwo_Router = express.Router()

// 解决接口的跨越问题
const cors = require('cors')
userPositiontwo_Router.use(cors())

const user_handler = require('../router_handler/user_positiontwo_handler')
// 导入路由处理函数,判断是否存在这个账号,这是登录的页面
userPositiontwo_Router.post('/user_position_two', user_handler.user_positiontwo_handler)

module.exports = userPositiontwo_Router