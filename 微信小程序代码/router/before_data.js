// 这是用来获取用户登录以后的数据
const express = require('express')
const baefore_data_Router = express.Router()
const baefore_data_Router_1 = express.Router()
// 解决接口的跨越问题
const cors = require('cors')
baefore_data_Router.use(cors())
baefore_data_Router_1.use(cors())
const data_handler = require('../router_handler/before_data_handler')
// 导入路由处理函数,判断是否存在这个账号,这是登录的页面
baefore_data_Router.post('/before_data', data_handler.before_data_handler)
baefore_data_Router_1.get('/delete_data', data_handler.before_data_handler)  //删除用户选中的数据
module.exports = {
    baefore_data_Router, baefore_data_Router_1
}