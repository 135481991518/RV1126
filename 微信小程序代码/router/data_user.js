// 用来获取单个摄像头的检测数据的路由
const express = require('express')
const data_user_Router = express.Router()  //单个摄像头的详细信息
const data_user_Router_1 = express.Router() //单个摄像头的统计信息
const data_user_Router_all = express.Router() //所有摄像头的统计信息

// 解决接口的跨越问题
const cors = require('cors')
data_user_Router.use(cors())
data_user_Router_1.use(cors())
data_user_Router_all.use(cors())
// 导入路由处理函数
const data_handler = require('../router_handler/user_data_handler')


data_user_Router.get('/content', data_handler.path_handler)
data_user_Router_1.post('/content_all', data_handler.path_handler)
data_user_Router_all.post('/every_content_all', data_handler.path_handler)
module.exports = {
    data_user_Router, data_user_Router_1, data_user_Router_all
}