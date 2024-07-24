Page({
    data:{
        user:{},
        disabled: false,
        btnstate: "primary",
        selected:false,
        camera:{},
        admin_camera:{},
        click:false,
        camera_data:{},
        admin_camera_data:{},
        userinfo:{},
        chakan:false,//查看用户信息
        adminyz:false //验证是否为管理员登录
    },
    bindDisable:function(e){
        var that = this
        var $data = e.currentTarget.dataset;  //获取点击的这个对象的值
        var params = $data 
        console.log(params.bean.openid);
        console.log(params);
        wx.showModal({
          title: '禁用用户',      
          content: '是否禁用(取消禁用)用户？',      
          showCancel: true,//是否显示取消按钮      
          cancelText: "取消",//默认是“取消”      
          cancelColor: '#DEB887',//取消文字的颜色      
          confirmText: "确定",//默认是“确定”      
          confirmColor: '#DEB887',//确定文字的颜色      
          success: function (res) {
              if (res.cancel) {
                  //点击取消,默认隐藏弹框        
              } else {
                  //点击确定          
                  wx.request({
                    url: 'https://dadashizhu.top/api/admin_user_state',
                    method:'POST',
                    data:{
                      params : params.bean,
                      action:'postss'
                    },
                    success:res=>{
                      console.log(res);
                      that.setData({
                          userinfo:res.data
                        })
                    },
                    fail:res=>{
                      console.log('更改失败');
                    }
                  })
                  console.log(that.data.userinfo);
                  console.log(params.bean.status);
                  if(params.bean.status==1) {
                    wx.showToast({
                      title: '用户已被恢复权限',
                      duration: 2000,
                      icon:'none'
                      });
                  }
                  else {
                    wx.showToast({
                      title: '用户已被禁用',
                      duration: 2000,
                      icon:'none'
                      });
                  }
                    setTimeout(function(){  
                      that.admin_binduser()
                       },2000)    
              }      
          },      
          fail: function (res) { },//接口调用失败的回调函数      
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）   
      })
        
    },
    // 管理员查看所有普通用户的状态
    admin_binduser:function(){
        var that =this
        that.setData({
            chakan:true,
            selected:false,
            click:false,
        })
        wx.request({
          url: 'https://dadashizhu.top/api/admin_user',
          method:'POST',
          data: {
              action:'posts'
          },
          success:res=>{
              console.log(res);
              that.setData({
                userinfo:res.data
              })
              console.log(that.data.userinfo);
          },
          fail:res=>{
              console.log(res);
          }
        })
    },
    // 管理员查看所有摄像头的部署位置等
    admin_bindimage:function(){
        var that = this
        that.setData({
                selected:true,
                click:false,
                chakan:false
        })
        wx.request({
            url: 'https://dadashizhu.top/api/admin_camera',
            method: 'GET',
            data: {
                 params:'get'
            },
            success:res=>{
             console.log(res);
             that.setData({
                admin_camera:res.data
                })
             console.log(that.data.admin_camera);
              },
              fail:res=>{
                console.log('请求失败');
              }
            })
    },
    // 管理员统计一个月内所有的垃圾
    admin_bindimage_all:function(){
        var that = this
            that.setData({
                click:true,
                selected:false,
                chakan:false
            })
            wx.request({
              url: 'https://dadashizhu.top/api/admin_camera_all',
              method: 'POST',
              data: {
                  action:'post'
              },
              success:res=>{
                console.log(res);
                that.setData({
                    admin_camera_data:res.data
                })
                console.log(that.data.admin_camera_data);
              },
              fail:res=>{
                console.log('请求失败');
              }
            })
    },
    bindSelect:function(e){
        // wx.showToast({
        //   title: '点击了',
        // })
        var that = this
        var $data = e.currentTarget.dataset;  //获取点击的这个对象的值
        console.log($data.bean);
        wx.navigateTo({
          url: '../show_data/show_data?camera='+JSON.stringify($data.bean),
        })
    },
    // 获取当前位置所有摄像头的垃圾统计
    bindimage_all:function(){
        var that = this
        let position = that.data.user[0].position
        if(that.data.user[0].position==null) {
            wx.showToast({
                title: '请先绑定地址',
                duration: 2000,
                icon:'none'
                });
                setTimeout(function(){
                    wx.reLaunch({
                      url: '../user2/user2',
                    })
                },2000)
        }
        else {
            that.setData({
                click:true,
                selected:false
            })
            wx.request({
              url: 'https://dadashizhu.top/api/every_content_all',
              method: 'POST',
              data: {
                  data_position: position,
                  action:'posts'
              },
              success:res=>{
                console.log(res);
                that.setData({
                    camera_data:res.data
                })
                console.log(that.data.camera_data);
              },
              fail:res=>{
                console.log('请求失败');
              }
            })
        }
    },
    // 获取当前位置的所有摄像头的信息
    bindimage:function(){
        var that = this
        let position = that.data.user[0].position
        if(that.data.user[0].position==null) {
            wx.showToast({
                title: '请先绑定地址',
                duration: 2000,
                icon:'none'
                });
                setTimeout(function(){
                    wx.reLaunch({
                      url: '../user2/user2',
                    })
                },2000)   
        }
        else {
            that.setData({
                selected:true,
                click:false
            })
            wx.request({
              url: 'https://dadashizhu.top/api/camera_user_position',
              method: 'POST',
              data: {
                  data_position: position,
                  params:'post'
              },
              success:res=>{
                console.log(res);
                that.setData({
                    camera:res.data
                })
                console.log(that.data.camera);
              },
              fail:res=>{
                console.log('请求失败');
              }
            })
        }
    },
    onLoad:function(){
        var that = this
        let users = wx.getStorageSync('users')  //取出存储在本地的数据
        console.log(users);
        if(users[0].ivtcode!=""&&users[0].ivtcode!=null&&users[0].ivtcode!=undefined){
          console.log('这是管理员登录');
          that.setData({
            user:users
        })
        }
        else {
          if(users[0].status==1) {
            wx.showToast({
                title: '用户已被禁用',
                duration: 2000,
                icon:'none'
                });
            that.setData({ disabled: true,  btnstate: "default" });
            // that.setData({}) 禁用以后所有的按钮都被禁止
            setTimeout(function(){
                wx.reLaunch({
                  url: '../user2/user2',
                })
            },2000)
        }
        if(users==null) {
            console.log('123');
            wx.showToast({
                title: '用户暂未登录，请登录',
                duration: 2000,
                icon:'none'
                });
            setTimeout(function(){
                wx.reLaunch({
                  url: '../user2/user2',
                })
            },2000)
        }
        else {
            that.setData({
                user:users
            })
        }
        }
        console.log(that.data.user);
        if(that.data.user[0].ivtcode==""||that.data.user[0].ivtcode==null||that.data.user[0].ivtcode==undefined) {
            that.setData({
                adminyz:false
            })
            that.bindimage()
        }
        else {
            that.setData({
                adminyz:true
            })
          this.admin_bindimage()
        }
        // console.log(that.data.user[0].ivtcode);
        // console.log(that.data.adminyz);
    },
    onShow:function(){
        this.onLoad()
    }
})