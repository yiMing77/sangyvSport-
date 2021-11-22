


// pages/b/b.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindGetUserInfo:function(e)
  {

    // 用户信息
    // console.log(e.detail.userInfo)

    // 直接跳转页面(拒绝了授权)
    wx.reLaunch({
      url: '/pages/homePage/homePage',
    })

  },

  
  // 数据库录入
  input() {
    // 取data

    let a = 666
    // 初始化数据库
    const db = wx.cloud.database()
    // 选择集合加入字段和对应的值
    db.collection('user_record').add({
      data: {
        _id:"course_1",
        test1: a

      },
      success(res) {
        console.log('success', res)
      }
    })


  },
  // 数据库查询
  find(){
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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