// pages/a/a.js
let a = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a:true

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  aa(){
    this.setData({
      a:false
    })

  },
  wxGetUserProfile: function () {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '用户登录',
        success: (res) => {
          resolve(res)
          // res.encryptedData,
          // res.iv
        },
        // 失败回调
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  wxSilentLogin: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success (res) {
          resolve(res.code)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  wxLogin: function (e) {
    let p1 = this.wxSilentLogin()
    let p2 = this.wxGetUserProfile()
    Promise.all([p1, p2]).then((res) => {
      let code = res[0]
      let iv = res[1].iv
      let encryptedData = res[1].encryptedData
      // 请求服务器
      wx.request({
        url: 'https://viencoding.com/api/v1/wx/login',
        method: 'post',
        data: {
          code: code,
          encrypted_data: encryptedData,
          iv: iv
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  getTime(){
    var myDate = new Date();
    // let c = myDate.getDate(); 
    let a = myDate.getMonth(); 
    // let str_c = c.toString();
    let str_a = a.toString();      
    console.log(a)
  },
  onLoad: function (options) {
    let that = this
    
    if(0===a){
      
    }else{
      console.log(333)
    }
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