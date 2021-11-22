// pages/course_1/course_1.js
// const app = getApp()
const SUBSCRIBE_ID = 'naJhPHuc4sqHpJluGER_f76XkAvU08O9btoYrgnQ4r0' 
var app = getApp(); //写在页面顶部page()外
let userInfoGetStatus = (app.globalData.userInfo == 0)
const db = wx.cloud.database()
let openId =wx.getStorageSync('openId')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // item:{
    //   ddd:4444
    // }
    item:{
      
     courseInfo:{

     },
     user_info:{

     }
    }



  },
  async subscribe_tap() {
    let that = this
    let status = this.data.item.user_info.subscibe_status
    console.log(status);
    that.setData({
      ['item.user_info.subscibe_status']: !status
    })
   const { result: { userInfo } } = await wx.cloud.callFunction({
      name: "changeCourse",
      data: {
        dataIndex: 2,
        status: !status
      }
    })
    app.globalData.userInfo = userInfo

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.error(1111);
   console.log(userInfoGetStatus);
    // 判断是否已经获取用户信息
    if (userInfoGetStatus) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    } else {
      this.setData({
        ['item.userInfo']: app.globalData.userInfo,
        ['item.hasUserInfo']: true
      })
    }
    // 获取相应课程信息
    wx.cloud.database().collection('course_list').doc('course_3').get()
      .then(res => {
        console.log(res.data)
        this.setData({
          ['item.courseInfo']: res.data,
          long: res.data.timeLong
        })
        console.log(this.data)
      }).catch(err => {
        console.log(err)
      })
    // 从用户user_record中获取用户的私人运动数据并放到data数据里面进行渲染
    this.setData({ ['item.user_info']: app.globalData.userInfo.usePerCourseDetail[2] })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

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

  },
  jumpGetuserInfoCourse_1() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_1_video',
    })

  },
  jumpGetuserInfoCourse_3() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        
        app.globalData.userInfo=res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_3_video',
    })

  },
  jumpGetuserInfoCourse_4() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        this.setData({
          ['item.userInfo']: res.userInfo,
          ['item.hasUserInfo']: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_4_video',
    })

  },
  jumpGetuserInfoCourse_2() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_2_video',
    })

  },
  jumpGetuserInfoCourse_5() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    wx.navigateTo({
      url: '/pages/course_video/course_5_video',
    })

  },

  jumpToCourse_1(){
    wx.navigateTo({
      url: '/pages/course_video/course_1_video',
    })
  },
  jumpToCourse_2(){
    wx.navigateTo({
      url: '/pages/course_video/course_2_video',
    })
  },
  jumpToCourse_3(){
    wx.navigateTo({
      url: '/pages/course_video/course_3_video',
    })
  },
  jumpToCourse_4(){
    wx.navigateTo({
      url: '/pages/course_video/course_4_video',
    })
  },
  jumpToCourse_5(){
    wx.navigateTo({
      url: '/pages/course_video/course_5_video',
    })
  },
})