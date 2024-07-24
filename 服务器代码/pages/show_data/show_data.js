// pages/show_data/show_data.js
Page({

    data: {
        camera:{},
        garbage:[],
        img_str : '',
        show: false,
        data_keys : [],
        data_values : []
    },
    bindimage_all:function(){
        var that = this
        wx.request({
          url: "https://dadashizhu.top/api/content_all",//填写服务器的URL
          data : {
            params:that.data.camera.camera_id,
            action:'post'
          },
          method : 'POST',
          success: res_all=> { //请求之后返回的信息
            console.log(res_all.data);
            that.setData({
              // 参数名必须与接口的参数名统一
              show:true,
              data_keys : res_all.data.data_keys,
              data_values : res_all.data.data_values
            })   
            console.log(this.data.data_keys);
            console.log(this.data.data_values);
          },
    
          fail: fal=>{  //小程序若没能成功访问，则返回错误信息到控制台
            console.log('服务器未响应或是请求方式错误')
            this.setData({
              // img : "/pages/tupian/dada.jpg"
            })
          }
        })
    },
    bindimage:function(){
        var that = this
        wx.request({
            url: 'https://dadashizhu.top/api/content',
            method:"GET",
            data:{
                params: that.data.camera.camera_id,
                action: 'get'
            },
            success: res=>{
                console.log(res);
                for(var i= 0;i<res.data.length;i++) {
                  res.data[i].accuracy = res.data[i].accuracy.toFixed(3)
                }
                console.log(res.data);
                that.setData({
                    garbage : res.data,
                    img_str : 'https://dadashizhu.top/capture/'+res.data[0].image,
                    // img_str : 'https://dadashizhu.top/capture/1662552875.jpg',
                    show : false
                })
                console.log(that.data.garbage);
                console.log(that.data);
              
            }
          })
    },
    onLoad: function (options) {
        var that = this
        let data = JSON.parse(options.camera)
        this.setData({
            camera:data
        })
        console.log(this.data.camera);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.bindimage()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})