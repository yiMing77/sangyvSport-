// pages/c.js
var app = getApp(); //写在页面顶部page()外
let teamID = wx.getStorageSync('openId')
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  tap() {
    let a = "sdafewafadfdasfasfdafdeweree323w"
   
    wx.navigateTo({
      url: '/pages/a/a?teamid=' + a,
    })
  },
  onLoad: function (options) {

    this.getopenid()





  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  console() {
    console.log(90900)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getopenid(e) {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: res => {
        console.log('本人openId', res.result.OPENID)
        wx.setStorageSync('openId', res.result.OPENID)


      },
      complete: res => {
        db.collection('test').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            _id: res.result.OPENID, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            sportTeamLeaderStatus: false,
            teamLeaderStatus: false,
            timeAnchor: {
              month: 5,
              day: 15,
              weekday: 0,
              weekReset: false
            },
            weekDayPercentageData: 0,
            usePerCourseDetail: [{
                courseId: 1,
                title: "八段锦",
                subscibe_status: false,
                excersize_times: 0,
                squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1.png"
              },
              {
                courseId: 2,
                title: "全面拉伸保健操",
                subscibe_status: false,
                excersize_times: 0,
                squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1 (2).png"
              },
              {
                courseId: 3,
                title: "肌肉关节活动操",
                subscibe_status: false,
                excersize_times: 0,
                squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1 (1).png"
              },
              {
                courseId: 4,
                title: "晨起唤醒活力运动",
                subscibe_status: false,
                excersize_times: 0,
                squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1 (3).png"
              },
              {
                courseId: 5,
                title: "睡前疲劳缓解拉伸",
                subscibe_status: false,
                excersize_times: 0,
                squareImgSrc: "cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/首页/订阅模块/正方形图片/未标题-1_画板 1 (4).png"
              }
            ],
            sportSumTimeLong: 0,
            sportSumDay: 0,
            sumSportTimes: 0
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          }
        })
        console.log(999)
      }

    })

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