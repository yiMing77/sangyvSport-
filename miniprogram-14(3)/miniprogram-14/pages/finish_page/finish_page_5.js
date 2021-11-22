// pages/finish_page/finish_page_5.js
const db = wx.cloud.database()
let openId = wx.getStorageSync('openId')

let userInfo = wx.getStorageSync('userInfo')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cite:{
      single_hard: false,
      single_easy: false,
      single_good: false,
      secletor_status: true,
      item: {
    },
    }
    
  },
  finish() {
    wx.reLaunch({
      url: '/pages/homePage/homePage',
    })
  },
  tapSimple() {
    this.setData({
      ['cite.single_easy']: true,
      ['cite.secletor_status']: false
    })

    const _ = db.command
    db.collection('sports-course-feedback').doc(wx.getStorageSync('openId')).update({
      data: {
        course_5: {
          feedback: _.push({
            valub: 1,
            date: 't'
          })
        }
      },
      success: function (res) {}
    })
  },
  tapGood() {
    this.setData({
      ['cite.single_good']: true,
      ['cite.secletor_status']: false
    })

    const _ = db.command
    db.collection('sports-course-feedback').doc(wx.getStorageSync('openId')).update({
      data: {
        course_5: {
          feedback: _.push({
            valub: 2,
            date: 't'
          })
        }
      },
      success: function (res) {}
    })
  },
  tapDifficult() {
    this.setData({
      ['cite.single_hard']: true,
      ['cite.secletor_status']: false
    })

    const _ = db.command
    db.collection('sports-course-feedback').doc(wx.getStorageSync('openId')).update({
      data: {
        course_5: {
          feedback: _.push({
            valub: 3,
            date: 't'
          })
        }
      },
      success: function (res) {}
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('user_record').doc(openId).update({
      // data 传入需要局部更新的数据
      data: {
        
        userInfoDetail:userInfo
      },
      success: function(res) {
        console.log(res.data)
      }
    })


    db.collection('sports-course-feedback').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: wx.getStorageSync('openId'),
          course_5: {
            feedback: []
          }
        }
      })
      .then(res => {})

    db.collection('course_list').where({
      _id: "course_5" // 查询条件：chapter=1
    }).get().then(res => {

      //之后编写 需要利用返回数据的代码 看个人情况吧
      this.setData({
        ['cite.item']: res.data[0]
      })
      console.log(this.data)
    }).catch(err => {
      console.log(err) //打印错误信息
    })

    this.getOpenid;
    db.collection('user_record').doc(openId).get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        ['cite.user_info']: res.data.usePerCourseDetail[4]
      })
    })

    // db.collection('sports-course-feedback').where({
    //   _id: wx.getStorageSync('openId'), // 查询条件：个人id
    // }).get().then(res => {
    //   this.setData({
    //     setitem: res.data[0]
    //   })
    //   console.log(this.data)
    // }).catch(err => {
    //   console.log(err) //打印错误信息
    // })

    //console.log("我是试试",res.data[0].course_1.times)
  },



  getOpenid() {
    let OPENID = wx.getStorageSync('openId')
    console.log(OPENID)
    let that = this
    that.a = OPENID
    console.log("更改过的a:", a)
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