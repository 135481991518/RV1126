// 数据定义的模�?
const mysql = require('mysql')
const db_1 = mysql.createPool({
    host: '82.157.114.162',
    user: 'root',
    password: 'Zwj123.+',
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    database: 'Login',
    timezone: "08:00",  // 在原来基础上增加这一�?
    multipleStatements: true,//����ͬʱִ�ж���SQL���
})
const db_2 = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'path'
})
const db_3 = mysql.createPool({
    host: '82.157.114.162',
    user: 'root',
    password: 'Zwj123.+',
    database: 'path'
})
let query = function( sql, values ) {
  // ����һ�� Promise
  return new Promise(( resolve, reject ) => {
    db_1.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          // �����Ự
          connection.release()
        })
      }
    })
  })
}
module.exports = {
    db_1, db_2, db_3,query
}