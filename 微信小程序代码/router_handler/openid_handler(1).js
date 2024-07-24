// 将路由处理函数放到这里   这部分的代码是实现登录信息
const request = require('request')
exports.openid_handler = (req, ress) => {
    // 导入数据库
    const appid = "wxe5e99458cad1aa9a"  //开发者的appid
    const appsecret = "74b57eed0001bc638c80c4425c940fa4"   //开发者的appsecret 登入小程序公共平台内查看
    const code = req.query.code //拿到传过来的code
    var openid = ''
    console.log(req.query.code);
    //调用 auth.code2Session接口，换取用户唯一标识 OpenID 和 会话密钥 session_key
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`

    request(url, (err, res, body) => {
        // console.log(res);
        console.log(body);
        // return res.send(body)  //将请求到的 OpenID与 session_key 返回给小程序页面js文件
        console.log();
        let message = JSON.parse(body)
        console.log(message.openid);
        // openid = JSON.parse(body).openid
        ress.send(message.openid)
        // console.log(body.openid
    })
}