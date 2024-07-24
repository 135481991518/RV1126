// 返回一串可以绑定的地理数据
const express = require('express')
const userPosition_Router = express.Router()
const userPosition_Router_1 = express.Router()
// 解决接口的跨越问题
const cors = require('cors')
userPosition_Router.use(cors())
userPosition_Router_1.use(cors())
const user_handler = require('../router_handler/user_position_handler')
// 导入路由处理函数,分别为可以绑定的大地址与大地址下面的小地址
userPosition_Router.get('/user_position', user_handler.user_position_handler)
userPosition_Router_1.post('/camera_user_position', user_handler.user_position_handler)
module.exports = {
    userPosition_Router, userPosition_Router_1
}