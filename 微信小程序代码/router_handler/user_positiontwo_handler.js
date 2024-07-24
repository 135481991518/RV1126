// 让用户去绑定选中的地理位置 

exports.user_positiontwo_handler = (req, res) => {
    // 导入数据库
    const sqldb = require('../db/index')
    db_1 = sqldb.db_1
    console.log('进入测试');
    const sql_Str = 'UPDATE user_two SET position=? where username=(select username from (select username from user_two where openid=?)as a);'; //根据openid去更新地理位置
    var body = req.body
    console.log(body);
    db_1.query(sql_Str, [body.position, body.openid], (err, result) => {
        res.send(result)
    })
}



