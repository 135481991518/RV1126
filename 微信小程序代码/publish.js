const { json } = require('express');
var mqtt = require('mqtt');
connect_url = 'mqtt://82.157.114.162:1883'
clientid = 'abcd'
const client = mqtt.connect(connect_url, {
    clean: true,
    username: 'dada',
    password: '123456'
});
// var qtt = {}; //定义消息（可以为字符串、对象等）
var qtt = {
    "camera_id": "001",
    "category": "易拉罐",
    "coordinate": "(161,192)",
    "image": "/image/易拉罐1",
    "time": "2022-7-11 06:12:53",
    "accuracy": 0.9723
}

// qtt = 'helloworld';
var qtts = JSON.stringify(qtt) //转换成JSON字符串
abc = 'dada'
// console.log(qtt.toString());
setInterval(function () { //3秒钟发送一次 
    client.publish('garbage', qtts.toString(), { qos: 2, retain: false });
}, 10000);


