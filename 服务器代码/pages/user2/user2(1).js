var util = require('../../utils/util')
var login_time = ''
var secret = '' //开发者密钥
var access_Token = '' //公众号的全局唯一接口调用凭据 两小时刷新
Page({
    data:{
      userInfo:{
      },
      user:{
        username:'',
        openid:'',
        phone:'',
        ivtcode:'',
        status:'',
        position:'',
        encryptedData:'',
        iv:'',
        loginTime:'',
      },
      before_data:{

      },
      count:0,
    },
    // 根据当前给出的时间进行查询数据并传入到消息通知的页面
    dataObtain:function(){
      var that = this
      wx.request({
        url: 'https://dadashizhu.top/api/before_data',
        method:'POST',
        data: {
          logintime:that.data.user[0].loginTime,
          openid:that.data.user[0].openid
        },
        success:(res)=>{
          that.setData({
            before_data:res.data
          })
          console.log(that.data.before_data);
          console.log('请求数据成功');
          
          that.setData({
            count:that.data.before_data.length
          })
        },
        fail:(res)=>{
            console.log('请求数据失败');
        }
      })
    },
    onLoad(){
      if (wx.getUserProfile) {
        this.setData({
          isLogin:true
        })
      }
    },
    // 关于使用说明
    useMessage:function(){
      wx.navigateTo({
        url: '../useMessage/useMessage',
      })
    },
    // 绑定邀请码
    IveCode:function(){
      var that = this
      console.log(that.data.user[0].ivtcode);
      if(that.data.user[0].ivtcode!=null) { //如果邀请码位置已绑定
        wx.showToast({
          title: '已经填写了邀请码，不可重新填写',
          duration: 2000,
          icon:'none'
          });
      }
      else {
        wx.navigateTo({
          url: '../code_admin/code_admin?openid='+that.data.user[0].openid,
        })
      }
    },
    // 请求access_token
//获取access_token
    message:function() {
      wx.request({
        url: 'https://dadashizhu.top/api/accessToken',
        method: 'GET',
        success(res) {
          access_Token = res.data
          console.log("获取access_token成功：" + access_Token)
        }
      })
    },
    // 跳转到绑定位置
    bindPosition:function(){
      var that = this
      if(that.data.user[0].position!=null) { //如果地理位置已绑定
        wx.showToast({
          title: '已经成功绑定了地理位置，不可重新绑定',
          duration: 2000,
          icon:'none'
          });
      }
      else {
        wx.navigateTo({
          url: '../position/position?openid='+that.data.user[0].openid,
        })
        that.onLoad()
      }
      // console.log(that.data.user);
    },
    // 跳转到消息通知
    bindMessage: function(){
     var that = this
     
     var beforeData = JSON.stringify(that.data.before_data)
     if(beforeData=='[]'||beforeData=='null'||beforeData==undefined) {
        wx.showToast({
          title: '暂无最新数据',
          icon: 'none',
          duration: 2000//持续的时间
        })
     }
      else {
        that.setData({
          count:0,
        })
        wx.navigateTo({
          url: '../message/message?before_data='+beforeData+'&openid='+that.data.user[0].openid+'&loginTime='+that.data.user[0].loginTime,
        }) 
      }    
    },
    // 跳转到绑定手机
    bindPhone:function(){
      var that = this
      // console.log(that.data.user[0]);
        if(that.data.user[0].phone=!null) { //如果手机号已绑定
          wx.showToast({
            title: '已经成功绑定了手机号，不可重新绑定',
            duration: 2000,
            icon:'none'
            });
        }
        else {
          wx.navigateTo({
            url: '../mobile/mobile?openid='+that.data.user[0].openid,
          })
        }
      },
    //授权登录
    getUserProfile(e){
      var that = this
      wx.getUserProfile({
        desc: '完善用户信息',
        success:res=>{
          console.log('ok',res.userInfo);
          console.log(this.data.userInfo);
          console.log(res.encryptedData);
          console.log(res.iv);
          let user =res.userInfo
          let enc = res.encryptedData
          let ivs = res.iv
          //缓存用户信息到本地
          wx.setStorageSync('user', user)
          this.setData({
            userInfo:user,
            encryptedData:enc,
            iv : ivs
          })
          this.onShow()
          setTimeout(function(){
            that.dataObtain()
          },1500)
        },
        fail:res=>{
          console.log('fail',res)
        }
      })
  
    },
  // 保存用户登录时间
  saveTime:function(params) {  
    var that = this   
      var TIME = util.formatTime(new Date());
      console.log('当前时间为'+TIME);
      wx.request({
        url: 'https://dadashizhu.top/api/usertime',
        method : 'POST',
        data : {
          openid: that.data.user[0].openid,
          loginTime:TIME
        },
        success: res=>{
          console.log(res);
          },
        fail: res=>{
          console.log('请求失败');
        }
      })
    },
  //退出登录
  outLogin(){    
    // 当用户点击退出登录以后才会将这个时间传给后台 微信小程序没有给出能够监听小程序退出的API，
    // 但是云函数能够使用此功能 小程序退出后，websocket会五秒后断开 但是此接口只能使用 wx的服务器
    this.saveTime()
    this.setData({
      userInfo:'',
    })
    wx.setStorageSync('user', null),
    wx.setStorageSync('users', null)
  },
  onLoad(){
    var that = this
    this.onShow()
    //  this.saveTime()
    // login_time = that.data.user[0].loginTime
    setTimeout(function(){
      that.dataObtain()
    },1500)
  },

  onShow(){
    let user=wx.getStorageSync('user')
    this.setData({
      userInfo:user,
    })
    var that = this
    var code; //openid
    var name; //nickname
    
    wx.request({
      url: 'https://dadashizhu.top/api/secret',
      method:'POST',
      success:res=>{
        secret = res.data
      }
    })
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
        console.log("用户的code:" + res.code);
        console.log(res);
        let codes = res.code
        console.log(codes);
        name = that.data.userInfo.nickName; //用户名赋值
        // 可以传给后台，再经过解析获取用户的 openid
        // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
        wx.request({
            // 自行补上自己的 APPID 和 SECRET
            url:'https://dadashizhu.top/api/openid?code='+codes,
            method:'GET',
            success: res => {
                // 获取到用户的 openid
                console.log(res);
                that.data.user.openid = res.data //将openid传给后台
                code = res.data
                that.setData({
                  ['user.code']:code,
                  ['user.username']:name,
                  ['user.openid']:code
                })
                
                console.log('用户的openid是:'+that.data.user.openid);
                console.log('用户名为:'+that.data.user.username);
                wx.request({
                  url: 'https://dadashizhu.top/api/userInfo',
                  method : 'POST',
                  data : {
                    username: that.data.user.username,
                    openid: that.data.user.code,
                  },
                  success: res=>{
                      that.setData({
                        user:res.data
                      })                     
                      console.log(res);
                      if(that.data.user[0].loginTime==undefined||that.data.user[0].loginTime==''||that.data.user[0].loginTime==null) {
                        that.data.user[0].loginTime = ''
                      }
                      wx.setStorageSync('users', that.data.user)
                    },
                  fail: res=>{
                    console.log('绑定失败');
                  }
                })
            }
        });
        
      }
    });
  },
  })