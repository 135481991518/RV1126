const mqtt = require("mqtt");
// 导入express模块
const express = require('express')
// 导入数据库 
const sqldb = require('./db/index');
const e = require("express");
db_1 = sqldb.db_1
// 数据库语句
// 插入数据
const sqlStr = 'insert into garbage(camera_id,category,coordinate,image,time,accuracy) values (?,?,?,?,?,?)'
// 查询此数据是否存在 如果存在 则不插入
const sqlStr_1 = 'select * from garbage where coordinate = ?'
// mqtt服务器地址
connect_url = 'mqtt://82.157.114.162:1883'
// 客户端ID
const clientid = 'dada'
const client = mqtt.connect(connect_url, {
    clientId: clientid,
    clean: false, //true 清除会话 false 保留会话 即使客户端离线 也会将未发送的信息保存在mqtt服务器
    username: 'dada',
    password: '123456'
});
client.on("connect", function () {
    console.log("服务器连接成功");
    client.subscribe("garbage_two", () => {
        console.log('订阅成功');
    });
});
// 日期格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var data = {}

client.on("message", function (top, payload) {
    // console.log("当前主题：", top);
    // console.log(payload.toString());
    data = eval('(' + payload.toString() + ')');
    console.log(data);
    // console.log(typeof (data.time));
    // console.log(Date());
    var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
    data.time = time2
    db_1.query(sqlStr, [data.camera_id, data.category, data.coordinate, data.image, data.time, data.accuracy], (err, result_1) => {
        if (err) {
            console.log('存储失败');
            return 0
        }
        // console.log('123');
        if (result_1.affectedRows === 1) {
            console.log('插入数据成功');
        }
    })
    //     }
    // })
}, { qos: 2, retain: false }); //retain = true 表示会在服务器保留这条消息
