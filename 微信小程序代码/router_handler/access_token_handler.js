// 将路由处理函数放到这�?  这部分的代码是实现获取access_token
const request = require('request')
exports.accesstoken_handler = (req, ress) => {
    // 导入数据�?
    const appid = "wxe5e99458cad1aa9a"  //开发者的appid
    const appsecret = "74b57eed0001bc638c80c4425c940fa4"   //开发者的appsecret 登入小程序公共平台内查看
    var access_token = ''
    //调用 auth.code2Session接口，换取用户唯一标识 OpenID �?会话密钥 session_key
    const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret

    request(url, (err, res, body) => {
        // console.log(res);
        console.log(body);
        // return res.send(body)  //将请求到�?OpenID�?session_key 返回给小程序页面js文件
        // console.log();
        let message = JSON.parse(body)
        console.log(message.access_token)
        // console.log(message.openid);
        // openid = JSON.parse(body).openid
         ress.send(message.access_token)
        // console.log(body.openid)
    })
}