// ��·�ɴ������ŵ�����   �ⲿ�ֵĴ�����ʵ�ֱ����û��ĵ�¼��Ϣ

exports.user_handler = (req, res) => {
    // �������ݿ�
    const sqldb = require('../db/index')
    console.log('��������')
    db_1 = sqldb.db_1
    // �ж��û����Ƿ��Ѵ���
    const sql = 'select * from user_two where openid=?'
    // ��������΢�ŵ���Ϣ
    const sqlStr = 'insert into user_two(openid,username) values (?,?)'
    // �������ұ������Ϣ
    const sqlStr_two = 'select * from user_two where openid=?'
    // ���ڸ����û��ĵ�¼ʱ��
    const sqlStr_three = 'update user_two SET loginTime=? WHERE openid=?'
    var userinfo = req.body   
    console.log(userinfo);
    // console.log(userinfo.username);
    console.log(userinfo.username);
    if (userinfo.loginTime==null||userinfo.loginTime=='') {
        db_1.query(sql, [userinfo.openid], (err, result) => {

            // console.log(result.length);
            // ִ�� SQL ���ʧ��
            if (err) {
                console.log(err.message);
                return res.send({ status: 1, message: err.message })
            }
            // �û�����ռ��
            if (result.length > 0) {
                console.log('���û�����');
                // return res.send('�û��Ѵ��ڣ�')
                console.log(userinfo);
                console.log(userinfo.phone);
                // ����û������򷵻� ��ѯ������������������

                db_1.query(sqlStr_two, [userinfo.openid], (err, result_1) => {
                    return res.send(result_1)
                })
            }
            else {
                db_1.query(sqlStr, [userinfo.openid, userinfo.username], (err, result) => {
                    if (err) console.log(err.message);
                   // if (result.affectedRows == 1) {
                        console.log('�������ݳɹ�');
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
            console.log('����ʱ��ɹ�');
            db_1.query(sqlStr_two, [userinfo.openid], (err, result_1) => {
                    return res.send(result_1)
                })
          //  return res.send('���³ɹ�')
        })
    }
}