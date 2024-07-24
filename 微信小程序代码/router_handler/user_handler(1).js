// 将路由处理函数放到这里   这部分的代码是实现保存用户的登录信息

exports.user_handler = (req, res) => {
    // 导入数据库
    const sqldb = require('../db/index')
    console.log('测试数据')
    db_1 = sqldb.db_1
    // 判断用户名是否已存在
    const sql = 'select * from user_two where openid=?'
    // 用来插入微信的信息
    const sqlStr = 'insert into user_two(openid,username) values (?,?)'
    // 用来查找保存的信息
    const sqlStr_two = 'select * from user_two where openid=?'
    // 用于更改用户的登录时间
    const sqlStr_three = 'update user_two SET loginTime=? WHERE openid=?'
    var userinfo = req.body   
    console.log(userinfo);
    // console.log(userinfo.username);
    console.log(userinfo.username);
    if (userinfo.loginTime==null||userinfo.loginTime=='') {
        db_1.query(sql, [userinfo.openid], (err, result) => {

            // console.log(result.length);
            // 执行 SQL 语句失败
            if (err) {
                console.log(err.message);
                return res.send({ status: 1, message: err.message })
            }
            // 用户名被占用
            if (result.length > 0) {
                console.log('此用户存在');
                // return res.send('用户已存在！')
                console.log(userinfo);
                console.log(userinfo.phone);
                // 如果用户存在则返回 查询出的满足条件的数据

                db_1.query(sqlStr_two, [userinfo.openid], (err, result_1) => {
                    return res.send(result_1)
                })
            }
            else {
                db_1.query(sqlStr, [userinfo.openid, userinfo.username], (err, result) => {
                    if (err) console.log(err.message);
                   // if (result.affectedRows == 1) {
                        console.log('插入数据成功');
                        db_1.query(sqlStr_two, [userinfo.openid], (err, result) => {
                            return res.send(result)
                        })
                   // }

                })
            }

        })
    }
   else {
        db_1.query(sqlStr_three, [userinfo.loginTime, userinfo.openid], (err, resulit) => {
            console.log('更新时间成功');
            db_1.query(sqlStr_two, [userinfo.openid], (err, result_1) => {
                    return res.send(result_1)
                })
          //  return res.send('更新成功')
        })
    }
}