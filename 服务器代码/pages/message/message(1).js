var i;  //选中的复选框
Page({

    data: {
        open:true,
        edit:true,
        loginTime:'',
        openid:'',
        before_data:{

        },
        index: [

        ]
    },
    // 点击编辑按钮
    bindEdit:function (e) {
        this.setData({
            edit:false,
            open:false
        })
    },
    // 取消编辑按钮
    cancelEdit:function (e) {
        this.setData({
            edit:true,
            open:true
        })
    },
    // 选中按钮
    selectCheck:function(e){
        // console.log('点击了');
        // console.log(e);
        let checked =e.detail.value.length;
        // 如果选中将它的id传给数组，如果取消选中或者未选中则将它赋值为""
        if(checked==1) {
            this.data.index[i] = i
        }
        else {
            this.data.index[i] = ''
        }
        console.log(this.data.index);
    },
    // 删除按钮
    deleteData:function(){
        // console.log('点击了删除按钮');
        var data = []
        var that = this
        for(let j =0;j<this.data.index.length;j++) {
            if(this.data.index[j]!==""&&this.data.index[j]!=null) {
                data.push(this.data.before_data[this.data.index[j]].coordinate)
            }
        }
        console.log(data);
        if(data.length!=0) {
            wx.showModal({
                title: '提示',
                content: '是否删除数据',
                success: function (res) {
                  if (res.confirm) {//这里是点击了确定以后
                    wx.request({
                      url: 'https://dadashizhu.top/api/delete_data',
                      method:'GET',
                      data:{
                          params:'get',
                          delete_data :data
                      },
                      success:(res)=>{
                        wx.request({
                            url: 'https://dadashizhu.top/api/before_data',
                            method:'POST',
                            data: {
                              logintime:that.data.loginTime,
                              openid:that.data.openid
                            },
                            success:(res)=>{
                              that.setData({
                                before_data:res.data
                              })
                              let currentPages = getCurrentPages();  //获取当前页面的所有page内容
                              let prePage = currentPages[currentPages.length - 2]; 
                              prePage.setData({
                                //对data里面的值进行修改 更改上一页面的值
                                before_data:that.data.before_data
                              }) 
                              console.log(that.data.before_data);
                              console.log('请求数据成功');
                              that.cancelEdit()
                            },
                            fail:(res)=>{
                                console.log('请求数据失败');
                            }
                          })
                      },
                      fail:()=>{
                          console.log('请求数据失败');
                      }
                    })
                  } else {//这里是点击了取消以后
                  }
                }
              })
        }
    },
    // 父组件给子组件传值 使用capture-bind:tap 点击复选框时在事件捕获阶段执行了此函数 
    fatherData:function(e){
        // 获取点击的这个值的ID
        i = e.currentTarget.dataset.index;
        // 获取点击这个值的数据
        // console.log(e.currentTarget.dataset.data);
    },
    compare : function (prop) {
        return function (obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return 1;
            } else if (val1 > val2) {
                return -1;
            } else {
                return 0;
            }            
        } 
    },
    onLoad:function(e) {
        console.log(e);
        // console.log(e.before_data);
        var that = this
        let data = JSON.parse(e.before_data)
        //data = data.reverse()
        data = data.sort(that.compare('time'))
        
        console.log(data);
        let time = e.loginTime
        let openid = e.openid
        this.setData({
            before_data:data,
            openid:openid,
            loginTime:time
        })
    }
})
