// 使用户绑定的地理位置 返回一个数组对�?
// 返回一个摄像头的地理信息，根据传入的位置查看这个摄像头的数�?
exports.admin_handler = (req, res) => {
    // 导入数据�?
    const sqldb = require('../db/index')
    db_1 = sqldb.db_1
    console.log('进入测试');
    actions = req.body
    action = req.query
    console.log(req.query);
    // 获得所有摄像头的部署信�?
    const sql_Str = 'select camera_id,camera_series,camera_position from camera_info '
    // 统计一个月以内的所有的垃圾信息
    const sqlStr = 'select camera_info.camera_id,category,camera_position  from garbage  join camera_info on garbage.camera_id=camera_info.camera_id where DATE_SUB(CURDATE(), INTERVAL 29 DAY) <= date(time)'
    // var userinfo = req.body
    // 查找所有不是管理员的用�?
    const sql = 'select * from user_two where ivtcode is NULL'
    // 取消禁用
    const sql_1 = 'update user_two set status = 0  where openid=?'
    // 禁用
    const sql_2 = 'update user_two set status = 1  where openid=?'
    var params = []
    if (action.params == 'get') {
        sqldb.db_1.query(sql_Str, (err, result) => {
            if (err) {
                console.log(err.message);
                return res.send({ status: 1, message: err.message })
            }
            var result = JSON.parse(JSON.stringify(result)) //将从数据库获取过来的数据进行特殊处理,使其转换为正常的JSON对象
            for (var key in result) {   // 将对象写入数�?
                // console.log(key); 0,1,2,3
                params.push(result[key]);
            }
            console.log(result);
            console.log(params);
            return res.send(params)
        })
    }
    // 这里用for循环遍历所有的函数
    if (actions.action == 'post') {
        var data = []
        db_1.query(sqlStr, (err, result_2) => {
            if (err) {
                console.log('查询失败' + err.message);
            }
            var result_2 = JSON.parse(JSON.stringify(result_2)) //将从数据库获取过来的数据进行特殊处理,使其转换为正常的JSON对象
            console.log(result_2);

            console.log('传输成功');
            // 向数据库添加新的属�?
            for (var i = 0; i < result_2.length; i++) {
                result_2[i].num = 1
            }
            // console.log(result_2);
            // 将所有的信息进行统计，并放到
            for (var i = 0; i < result_2.length; i++) {
                for (var j = i + 1; j < result_2.length; j++) {
                    if (result_2[i].category == result_2[j].category&&result_2[i].camera_id==result_2[j].camera_id) {
                        result_2[i].num++
                        // console.log(result_2);
                        console.log('这是进入的第' + i + '�?');
                        result_2.splice(j, 1)
                        j--
                    }
                }
            }
            console.log(result_2);
            return res.send(result_2)
        })
    }
    // 查找所有用户信�?
    if (actions.action == 'posts') {
        db_1.query(sql, (err, result) => {
            if (err) {
                console.log('查询失败' + err.message);
            }
            result = JSON.parse(JSON.stringify(result))
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                if (result[i].status == 0) {
                    result[i].state = '禁用'
                }
                else {
                    result[i].state = '取消禁用'
                }
            }
            return res.send(result)
        })
    }
    // 更改用户状�?
    if (actions.action == 'postss') {
        console.log(actions);
        console.log(actions.params);
        if (actions.params.status == 1) {
            db_1.query(sql_1, [actions.params.openid], (err, res) => {
                if (err) {
                    console.log('更改失败' + err.message);
                }
            })
        }
        if (actions.params.status == 0) {
            db_1.query(sql_2, [actions.params.openid], (err, res) => {
                if (err) {
                    console.log('更改失败' + err.message);
                }
            })
        }
    }
}



