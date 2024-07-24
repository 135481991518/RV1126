Page({
    data:{
        openid:'',
        disabled: true,
        btnstate: "default",
        content: ''
    },
    mobileblur: function (e) {
        var content = e.detail.value;
        this.setData({
            content:content
        })
        console.log(e.detail.value);
         //采用正则手机号码验证
         if(this.data.content.trim()!=""&&this.data.content.length==6) {
            this.setData({ disabled: false,  btnstate: "primary" });
          }
        else {
            this.setData({ disabled: true,  btnstate: "default" });
            wx.showToast({
                title: '验证码格式错误',
                duration: 2000,
                icon:'none'
                });
        }
        // console.log(this.data.mobile);
      },
    ivtcode:function(){
        var that = this
        wx.request({
          url: 'https://dadashizhu.top/api/ivtcode',
          method:'POST',
          data: {
              params : that.data.content,
              openid : that.data.openid
          },
          success:res=>{
            console.log(res.data);
            if(res.data.status==1) {
                wx.showToast({
                    title: '邀请码错误，请重新填写',
                    duration: 2000,
                    icon:'none'
                    });
            }
            if(res.data.status==2) {
                wx.showToast({
                    title: '邀请码错误已被使用',
                    duration: 2000,
                    icon:'none'
                    });
            }
            if(res.data.status==0) {
                wx.showToast({
                    title: '邀请码绑定成功',
                    duration: 2000,
                    icon:'none'
                    });
                setTimeout(function(){
                    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                    let prevPage = pages[ pages.length - 2 ];  
                    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
                    wx.navigateBack({
                          delta: 1,
                        })
                       },2000)
            }
          },
          fail:res=>{
            console.log('绑定失败');
          }
        })
    },
    onShow:function(){

    },
    onLoad:function(e){
        console.log(e.openid);
        let openids = e.openid
        this.setData({
            openid: openids
        })
    }
})