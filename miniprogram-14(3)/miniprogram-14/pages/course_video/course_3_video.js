// pages/course_video/course_3_video.js
let user_detail = wx.getStorageSync('userInfo')
const db = wx.cloud.database()
let openId = wx.getStorageSync('openId')
let myDate = new Date();
let teamId = wx.getStorageSync('teamId')
const {sleep} = require('../../utils/sleep.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    
   
    item:{
      
      button_status:true
    }

  },
  pause(){
    const TxvContext = requirePlugin("tencentvideo");  
    let txvContext = TxvContext.getTxvContext('txv1') 
    
    txvContext.pause();
    this.setData({
      ['item.button_status']:true
    })
  },
  play(){
    const TxvContext = requirePlugin("tencentvideo");  
    let txvContext = TxvContext.getTxvContext('txv1') 
    
    txvContext.play();
    this.setData({
      ['item.button_status']:false
    })

  },
  async finish() {
    // 周进度条判断
    // 判断是否比前一天小
    try {
      console.log("执行finish,45")
      if (!this.data.user_info) {
        wx.showToast({
          title: '数据库获取失败',
        })
      }
      let beforeDay = this.data.user_info.timeAnchor.day
      let beforeMonth = this.data.user_info.timeAnchor.month
      let nowDay = myDate.getDate();
      let nowMonth = myDate.getMonth();
      let myWeekDay = myDate.getDay();
      if (beforeMonth == nowMonth) {
        if (nowDay == beforeDay) {
          console.log("本日运动无需更改周数据库")
        } else {
          if (myWeekDay == 1) {
            await wx.cloud.callFunction({
              name: 'changeUserInfo',
              data: {
                type: 'changeProgressBar',
                weekDayPercentageData: 14.3
              }
            })
          } else {
            await wx.cloud.callFunction({
              name: 'changeUserInfo',
              data: {
                type: 'changeProgressBar',
                weekDayPercentageData: 14.3
              }
            })
          }
        }
      } else {
        if (myWeekDay == 1) {
          await wx.cloud.callFunction({
            name: 'changeUserInfo',
            data: {
              type: 'changeProgressBar',
              weekDayPercentageData: 14.3
            }
          })
        } else {
          await wx.cloud.callFunction({
            name: 'changeUserInfo',
            data: {
              type: 'changeProgressBar',
              weekDayPercentageData: 14.3
            }
          })
        }
      }
      if (beforeMonth == nowMonth) {
        if (nowDay == beforeDay) {
          console.log("本日运动无需更改数据库")
        } else {
          await wx.cloud.callFunction({
            name: 'changeUserInfo',
            data: {
              type: 'changeDay',
              nowDay,
              nowMonth
            }
          })
        }
      } else {
        await wx.cloud.callFunction({
          name: 'changeUserInfo',
          data: {
            type: 'changeDay',
            nowDay,
            nowMonth
          }
        })
      }
      //获取该课程时间
      let timeLong = this.data.item.timeLong
      // 做数据更新
      const dataIndex = 2
      let {
        sportTeamStatus,
        myOfTeamTime = 0
      } = app.globalData.userInfo
      if (sportTeamStatus) {
        myOfTeamTime = myOfTeamTime + timeLong
        app.globalData.userInfo.myOfTeamTime = myOfTeamTime
      }
      await wx.cloud.callFunction({
        name: 'changeUserInfo',
        data: {
          type: 'changeTime',
          timeLong,
          myOfTeamTime,
          dataIndex
        }
      })
      console.log("执行finish_1,175")
      wx.navigateTo({
        url: '/pages/finish_page/finish_page_3',
      })
    } catch (e) {
      console.log(e);
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //useropenid（）.then的代码在useropenid之后执行此时缓存中已经有openid
    //其他代码没有改变。其他几个视频做类似的处理
    app.useropenid().then(async(res) => {
      openId =  wx.getStorageSync('openId');
      console.log(openId);
      console.log("我是useropenid"+res);
    let courseres = await wx.cloud.callFunction({
      name:"course",
      data:{
       coursename: 'course_3',
       user_detail:user_detail
      }
    })
    console.log(courseres.result);
    this.setData({
      item:courseres.result.item,
      user_info: courseres.result.user_info
    })
    }).catch((res) => console.log(res))
  
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