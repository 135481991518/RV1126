var interval = null //倒计时函数
const app = getApp();
Page({
    data: {
      disabled: true,
      disabled2:true,
      time:'获取验证码',
      currentTime: 61,
      btnstate: "default",
      btnstate2:"default",
      mobile: "",
      yzm: "",
      code:"",
      openid:''
    },
  mobileblur: function (e) {
      var content = e.detail.value;
      console.log(e.detail.value);
       //采用正则手机号码验证
      if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(content))) {
        wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon:'none'
        });
      }
      else {
        this.setData({ disabled2: false, mobile: content, btnstate2: "primary" });
      }
      // console.log(this.data.mobile);
    },
    // 验证码输入事件
  vinInput: function(e){
      this.setData({
        yzm: e.detail.value
        })
      if(this.data.yzm.trim()!=""&&this.data.yzm.length==6) {
          this.setData({ disabled: false,  btnstate: "primary" });
        }
      else {
        this.setData({ disabled: true,  btnstate: "default" });
      }
    },
   //获取验证码，倒计时
  getCode: function(e){
    var that = this
    var currentTime = that.data.currentTime
    that.setData({
      disabled2:true
    }),
    wx.request({
      url: "https://dadashizhu.top/api/code",
      method : 'GET',
      data: {
        phone: that.data.mobile
      },
      success: res=>{
        console.log('验证码发送成功');
        console.log(res);
        that.setData({
          code:res.data
        })
        console.log(that.data.code);
      },
      fail: res=>{
          console.log('验证码发送失败');
      }
    })
    clearInterval(interval)
    interval = setInterval(function(){   
        currentTime--
        that.setData({
          time: currentTime + ' 秒'
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
          time: '重新获取',
          currentTime: 61,
          disabled2: false
        }) 
        }
      },1000)
  
     
},
// 绑定手机号
bindDing: function(e){
   console.log(1111111);
    var that = this
    // console.log(that.data.code);
    // console.log(that.data.yzm);
    if(that.data.code!=that.data.yzm) {
      wx.showToast({
        title: '验证码错误',
        duration: 2000,
        icon:'none'
        });
    }
    else {
      let phone = that.data.mobile
      let openids = that.data.openid
      console.log(openids);
      wx.request({
        url: 'https://dadashizhu.top/api/userInfo_phone',
        method : 'POST',
        data : {
          phone:phone,
          openid:openids
        },
        success: res=>{
          // console.log(res.data.trim());
            console.log(res);
          },
        fail: res=>{
          console.log('绑定失败');
        }
      })
      wx.showToast({
        title: '绑定成功',
        duration: 2000,
        icon:'none'
        });
       setTimeout(function(){
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        let prevPage = pages[ pages.length - 2 ];  
        //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            binding:true
        })
        wx.navigateBack({
          delta: 1,
        })
       },2000)
    }
  },
  onLoad:function(e){
    console.log(e.openid);
    var that = this
    that.setData({
      openid:e.openid
    })
    console.log(that.data.openid);
  }
})
 
 


