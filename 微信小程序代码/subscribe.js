const mqtt = require("mqtt");
// ����expressģ��
const express = require('express')
// �������ݿ� 
const sqldb = require('./db/index');
const e = require("express");
db_1 = sqldb.db_1
// ���ݿ����
// ��������
const sqlStr = 'insert into garbage(camera_id,category,coordinate,image,time,accuracy) values (?,?,?,?,?,?)'
// ��ѯ�������Ƿ���� ������� �򲻲���
const sqlStr_1 = 'select * from garbage where coordinate = ?'
// mqtt��������ַ
connect_url = 'mqtt://82.157.114.162:1883'
// �ͻ���ID
const clientid = 'dada'
const client = mqtt.connect(connect_url, {
    clientId: clientid,
    clean: false, //true ����Ự false �����Ự ��ʹ�ͻ������� Ҳ�Ὣδ���͵���Ϣ������mqtt������
    username: 'dada',
    password: '123456'
});
client.on("connect", function () {
    console.log("���������ӳɹ�");
    client.subscribe("garbage_two", () => {
        console.log('���ĳɹ�');
    });
});
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
var data = {}

client.on("message", function (top, payload) {
    // console.log("��ǰ���⣺", top);
    // console.log(payload.toString());
    data = eval('(' + payload.toString() + ')');
    console.log(data);
    // console.log(typeof (data.time));
    // console.log(Date());
    var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
    data.time = time2
    db_1.query(sqlStr, [data.camera_id, data.category, data.coordinate, data.image, data.time, data.accuracy], (err, result_1) => {
        if (err) {
            console.log('�洢ʧ��');
            return 0
        }
        // console.log('123');
        if (result_1.affectedRows === 1) {
            console.log('�������ݳɹ�');
        }
    })
    //     }
    // })
}, { qos: 2, retain: false }); //retain = true ��ʾ���ڷ���������������Ϣ
