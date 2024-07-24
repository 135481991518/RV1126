// pages/position/position.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myListPosition:[],
        openid:''
    },
    ClickItem:function(e){
        var that = this
        let openids = that.data.openid
        var $data = e.currentTarget.dataset;
        let positions = $data.bean.camera_series_positions
        console.log($data.bean);
        wx.showModal({
            title: '绑定位置',      
            content: '是否绑定当前位置？',      
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
                        url: 'https://dadashizhu.top/api/user_position_two',
                        method:'POST',
                        data:{
                            openid:openids,
                            position:positions
                        },
                        success:res=>{
                            console.log('绑定位置信息成功');
                        }
                      })
                      wx.showToast({
                        title: '绑定位置信息成功，不可再修改',
                        duration: 2000,
                        icon:'none'
                        });
                      setTimeout(function(){
                          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                          let prevPage = pages[ pages.length - 2 ];  
                          //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
                          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                            //   position:$data.bean.camera_series_positions
                          })
                          wx.navigateBack({
                            delta: 1,
                          })
                         },2000)    
                }      
            },      
            fail: function (res) { },//接口调用失败的回调函数      
            complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）   
        })
        
      
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        that.setData({
            openid:options.openid
          })
        wx.request({
          url: 'https://dadashizhu.top/api/user_position',
          method: 'GET',
          data:{
            params:'get'
          },
          success:res=>{
            console.log(res.data);
            that.setData({
                myListPosition:res.data
            })
            console.log(that.data.myListPosition);
          }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    // onShow: function () {
    // },

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