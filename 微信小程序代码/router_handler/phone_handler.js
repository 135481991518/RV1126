// 将路由处理函数放到这里   这部分的代码是实现注册信息

exports.user_handler = (req, res) => {
    // 导入数据库
    const sqldb = require('../db/index')
    console.log('测试数据')
    db_1 = sqldb.db_1
    // 判断用户名是否已存在
    const sql = 'select * from user_two where openid=?'
    const sqlStr_two = 'select * from user_two where openid=?'
    // 用来存储用户输入的手机号
    const sqlStr_three = 'UPDATE user_two SET phone=? where username=(select username from (select username from user_two where openid=?)as a)';
    var userinfo = req.body
    console.log(userinfo);
    // console.log(userinfo.username);
    console.log(userinfo.username);
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
            if (userinfo.phone != '') {
                db_1.query(sqlStr_three, [userinfo.phone, userinfo.openid], (err, result) => {
                    res.send(result)
                })
            }
        }

    })

}