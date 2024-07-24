// 使用户绑定的地理位置 返回一个数组对象
// 返回一个摄像头的地理信息，根据传入的位置查看这个摄像头的数据
exports.user_position_handler = (req, res) => {
    // 导入数据库
    const sqldb = require('../db/index')
    db_1 = sqldb.db_1
    console.log('进入测试');
    actions = req.body
    action = req.query
    console.log(req.query);
    const sql_Str = 'select camera_id,camera_series_positions from camera_info' //查询出所有的地点与对应的ID
    const sqlStr = 'select camera_id,camera_series,camera_position from camera_info where camera_series_positions=?'
    // var userinfo = req.body
    var params = []
    if (actions.params == 'post') {
        sqldb.db_1.query(sqlStr, actions.data_position, (err, result) => {
            if (err) {
                console.log(err.message);
                return res.send({ status: 1, message: err.message })
            }
            var result = JSON.parse(JSON.stringify(result)) //将从数据库获取过来的数据进行特殊处理,使其转换为正常的JSON对象
            for (var key in result) {   // 将对象写入数组
                // console.log(key); 0,1,2,3
                params.push(result[key]);
            }
            res.send(params)
        })
    }
    // 这里用for循环遍历所有的函数
    if (action.params == 'get') {
        db_1.query(sql_Str, (err, result) => {
            if (err) {
                console.log(err.message);
                console.log('有问题');
                return res.send({ status: 1, message: err.message })
            }
            console.log(result.length);
            console.log(result);
            var result = JSON.parse(JSON.stringify(result)) //将从数据库获取过来的数据进行特殊处理,使其转换为正常的JSON对象
            for (var key in result) {   // 将对象写入数组
                // console.log(key); 0,1,2,3
                params.push(result[key]);
            }
            let obj = {}
            // 对对象中某一属性值相同的进行去重
            params = params.reduce((pre, cur) => {
                obj[cur.camera_series_positions] ? "" : obj[cur.camera_series_positions] = true && pre.push(cur);
                return pre;
            }, []);
            // params = unique(params, 'camera_series_position')
            console.log(params);
            res.send(JSON.stringify(params))
        })
    }
}



