// ��ȡ�û��˳���¼�Ժ������

const sqldb = require('../db/index')
const db_1 = sqldb.query
// ����ʱ��
const sql = 'update user_two SET loginTime=? WHERE openid=?'
// ɾ������
//const sql_Str = 'update garbage set isShow=1 where  coordinate in (?)'
// ��ѯ����������������������
const sql_str = "select distinct camera_id,position,coordinate,category,time from garbage,user_two where time>=? and isShow !='1' and position in(select position from user_two where openid=?)"
exports.before_data_handler = async (req, res) => {
    var deleteData = req.query
    var data = req.body
    console.log(deleteData)
    console.log(data);
    var sql_Str = ''
    if (deleteData.params === 'get') {
        deleteData.delete_data = JSON.parse(deleteData.delete_data)
        for(let i = 0;i<deleteData.delete_data.length;i++) {
            //datas+= '"'+deleteData.delete_data[i]+'"'+','
            sql_Str+= 'update garbage set isShow=1 where  coordinate ='+'"'+deleteData.delete_data[i]+'"'+';'
            console.log(sql_Str)
      }
        // datas = datas.substr(0,datas.length-1)
        //sql_Str = sql_Str.substr(0,sql_Str.length-1)
        console.log(sql_Str)
        //let rows = await db_1(sql_Str,[datas])
        let rows = await db_1(sql_Str)
        return res.send(rows)
    }
    if (req.body.logintime == '') {
        var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
        let rows = await db_1(sql,[time,req.body.openid])
        console.log(rows);
        return res.send(rows)
    }
    else {
        let rows = await db_1(sql_str, [req.body.logintime, req.body.openid])
        console.log(rows);
        return res.send(rows)
    }
}
// ���ڸ�ʽ��
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //�·� 
        "d+": this.getDate(), //�� 
        "H+": this.getHours(), //Сʱ 
        "m+": this.getMinutes(), //�� 
        "s+": this.getSeconds(), //�� 
        "q+": Math.floor((this.getMonth() + 3) / 3), //���� 
        "S": this.getMilliseconds() //���� 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}