const express = require('express')
const { randomCode, sendCode } = require("./router/getMessage"); //导入验证码发送函�?
const app = express()
// const bodyParser = require('body-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ����ģ����Ϣ
//const sendMessage = require('./router/send_message')
//app.use('/api', sendMessage)

// ����ʱ���ȡ�˳�С�����Ժ������
const beforeData = require('./router/before_data')
app.use('/api', beforeData.baefore_data_Router)
app.use('/api', beforeData.baefore_data_Router_1)

// 传递微信secret 
const secrets = require('./router/secret')
app.use('/api', secrets)

// ����΢�ŵ�access_token
const access_token = require('./router/access_token')
app.use('/api', access_token)

// 获取用户的唯一标识
const openid = require('./router/openid')
app.use('/api', openid)

// 用户绑定邀请码
const ivtcode = require('./router/ivtcode')
app.use('/api', ivtcode.ivtcode_Router)

// 将用户信息保存到数据库中
const userInfo = require('./router/user')
app.use('/api', userInfo.userInfo_Router)
app.use('/api', userInfo.userInfo_Router_1)
// 绑定用户手机�?
const userInfo_phone = require('./router/user_phone')
app.use('/api', userInfo_phone)

// 用户绑定地理位置
const user_position = require('./router/user_position')
app.use('/api', user_position.userPosition_Router)
// 用户选择当前地理位置下的摄像�?
app.use('/api', user_position.userPosition_Router_1)

// 用户绑定地理位置
const user_position_two = require('./router/user_position_two')
app.use('/api', user_position_two)

// 导出图片数据
const data_user = require('./router/data_user')

app.use('/api', data_user.data_user_Router)
app.use('/api', data_user.data_user_Router_1)
app.use('/api', data_user.data_user_Router_all)
// 管理员导出图片数�?
const admin_user = require('./router/admin')

app.use('/api', admin_user.admin_Router)
app.use('/api', admin_user.admin_Router_1)
app.use('/api', admin_user.admin_Router_all)
app.use('/api', admin_user.admin_Router_state)


// 发送短信验证码
app.get("/api/code", (req, res) => {
    let code = randomCode(6);//生成6位数字随机验证码
    // let phone = JSON.stringify(req.query.phone);
    let phone = req.query.phone;
    console.log(phone);
    sendCode(phone, code, function (success) {
        if (success) {
            console.log(code);
            res.send(code);
        } else {
            res.send("短信验证码发送失�");
        }
    })
})
app.listen(8080, function () {
    console.log('启动成功');
})