// 将路由处理函数放到这�?  这部分的代码是实现登录信�?

exports.ivtcode_handler = (req, res) => {
    // 导入数据�?
    const sqldb = require('../db/index')
    db_1 = sqldb.db_1
    var isTrue = false
    var a = 1
    const sql = 'select * from Ivtcode'
    // 更新用户�?
    const sql_Str = 'UPDATE user_two SET Ivtcode=? where username=(select username from (select username from user_two where openid=?)as a)'
    // 更新邀请码�?
    const sqlStr = 'update Ivtcode set isUse=? where ivtcode=?'
    var userinfo = req.body
    console.log(userinfo);

    // 这里用for循环遍历所有的函数
    db_1.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.send({ status: 1, message: err.message })
        }
        var result = JSON.parse(JSON.stringify(result))
        console.log(result);
        for (var i = 0; i < result.length; i++) {
            if (userinfo.params == result[i].ivtcode && result[i].isUse == 0) {
                console.log('邀请码可以使用');
                db_1.query(sql_Str, [userinfo.params, userinfo.openid], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return res.send({ status: 1, message: err.message })
                    }
                    console.log(result);
                    db_1.query(sqlStr, [a, userinfo.params], (err, result) => {
                        console.log('更新成功');
                        console.log(result);
                        return res.send({ status: 0 })
                    })
                })
            }
        }
        for (var i = 0; i < result.length; i++) {
            if (userinfo.params == result[i].ivtcode) {
                isTrue = true
            }
        }
        if (isTrue) {
            for (var i = 0; i < result.length; i++) {
                if (userinfo.params == result[i].ivtcode && userinfo.isUse == 1) {
                    console.log('邀请码已被使用');
                    return res.send({ status: 2 });
                }
            }
        }
        else {
            console.log('邀请码错误');
            return res.send({ status: 1 })
        }
    })
}