// 管理员用来获取所有摄像头的检测数据的路由
const express = require('express')
const admin_Router = express.Router()  //单个摄像头的详细信息
const admin_Router_1 = express.Router() //单个摄像头的统计信息
const admin_Router_all = express.Router() //所有摄像头的统计信息
const admin_Router_state = express.Router()
// 解决接口的跨越问题
const cors = require('cors')
admin_Router.use(cors())        //管理员查看所有摄像头当前的状态
admin_Router_1.use(cors())      // 管理员查看所有摄像头的统计结果
admin_Router_all.use(cors())   //管理员查看所有普通用户
admin_Router_state.use(cors())  //管理员管理用户的状态
// 导入路由处理函数
const data_handler = require('../router_handler/admin_handler')


admin_Router.get('/admin_camera', data_handler.admin_handler)
admin_Router_1.post('/admin_camera_all', data_handler.admin_handler)
admin_Router_all.post('/admin_user', data_handler.admin_handler)
admin_Router_state.post('/admin_user_state', data_handler.admin_handler)
module.exports = {
    admin_Router, admin_Router_1, admin_Router_all, admin_Router_state
}