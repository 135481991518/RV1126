const mqtt = require("mqtt");
// 导入数据�?
const fs = require('fs');
// mqtt服务器地址
connect_url = 'mqtt://82.157.114.162:1883'
// 客户端ID
const clientid = 'nangao'
const client = mqtt.connect(connect_url, {
    clientId: clientid,
    clean: false, //true 清除会话 false 保留会话 即使客户端离�?也会将未发送的信息保存在mqtt服务�?
    username: 'nihao',
    password: '123456'
});
client.on("connect", function () {
    console.log("服务器连接成�?");
    client.subscribe("chunlei", () => {
        console.log('订阅成功');
    });
});
client.on("message", function (top, payload) {
    console.log(payload);
    var data = JSON.parse(payload)   //转换为对�?
    // console.log(data);
    console.log(data.name);
    var data_base64 = data.base64.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
    data_base64 = Buffer.from(data_base64, 'base64')//把base64码转成buffer对象
    console.log(data_base64);
    var path = '/data/capture/'+data.name;  //图片路径

    console.log('dataBuffer是否是Buffer对象�?' + Buffer.isBuffer(data_base64)); // 输出是否是buffer对象
    fs.writeFile(path, data_base64, function (err) {//用fs写入文件
        if (err) {
            console.log(err);
        } else {
            console.log('�ɹ�');
        }
    });
}, { qos: 2, retain: false }); //retain = true 表示会在服务器保留这条消�?
