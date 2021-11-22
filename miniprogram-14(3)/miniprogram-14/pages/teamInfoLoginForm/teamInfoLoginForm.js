// pages/teamInfoLoginForm/teamInfoLoginForm.js

let url = "" //数据库中图片的路径url
var app = getApp(); //写在页面顶部page()外
let openId = wx.getStorageSync('openId')
let userInfoGetStatus = (app.globalData.userInfo == 0)
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    fileList2: [], //前面文件列表的展示
    value: '',
  },
  // 获取图片上传后的url路径
  addImagePath(fileId) {
    var that = this
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        url = res.fileList[0].tempFileURL
        const {
          fileList2 = []
        } = that.data;
        fileList2[0].url = url
        fileList2[0].status = 'done'
        that.setData({
          fileList2
        });
      },
      fail: console.error
    })
  },
  // 点击上传图片后的状态
  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const {
      fileList2 = []
    } = this.data;
    fileList2.push({})
    fileList2[0].status = 'uploading'
    this.setData({
      fileList2
    });
    this.uploadImage(file.url);
  },

  // 上传到云开发的存储中
  uploadImage(fileURL) {
    var that = this
    wx.cloud.uploadFile({
      cloudPath: 'teamAvator/' + new Date().getTime() + '.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        //获取图片的http路径，准备添加到数据库中
        that.addImagePath(res.fileID)
        that.setData({
          fileID: res.fileID
        })
      },
      fail: console.error
    })
  },

  // 点击预览的x号，将图片删除
  deleteImg(event) {
    // 页面删除（假删除）
    const delIndex = event.detail.index
    const {
      fileList2
    } = this.data
    fileList2.splice(delIndex, 1)
    this.setData({
      fileList2
    })
    // 云存储删除（真删除）
    var fileID = this.data.fileID;
    this.deleteCloudSave(fileID)

  },



  onChange_name(event) {
    // event.detail 为当前输入的值

    this.setData({
      teamNickName: event.detail
    })
  },
  onChange_slogan(event) {
    // event.detail 为当前输入的值

    this.setData({
      teamSlogan: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },
   built:async function(){
     wx.showLoading({
       title: '加载中',
     })
    let { fileID, teamNickName, teamSlogan } = this.data
    const headuserInfo = { 
      sportSumTimeLong: this.data.userInfo.sportSumTimeLong,
      avatarUrl: this.data.userInfo.userInfo.avatarUrl,
      nickName: this.data.userInfo.userInfo.nickName
     }
    if(!fileID) {
      wx.showToast({
        title: '请上传队伍图片~',
        icon: 'none'
      })
      return
    }
    let res = await wx.cloud.callFunction({
      name:"attendteam",
      data: {
        //用于更新user-record的记录
        sportTeamStatus:true,
        sportTeamLeaderStatus:true,
        kind:'builtteam',
        //用于更新team-list的记录
        avatorUrl: fileID,
        teamName: teamNickName,
        teamSlogan: teamSlogan,
        headuserInfo:  headuserInfo,
      },
    })
    console.log(res.result);
    wx.setStorageSync('teamId', res.result.openid)
    let teamID = res.result.openid
    wx.hideLoading()
    console.log(teamID);
    wx.reLaunch({
      url: '/pages/memberlist/memberlist?host=1&teamid=' + teamID,
    })
   },
  // 上传图片
  submit:async function() {
    this.built()
  },
  // getUserInfo() {



  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(11)
  //       wx.setStorageSync('userInfo', res.userInfo)
  //       app.globalData.userInfo = res.userInfo
  //       app.globalData.userInfo = res.userInfo
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //       // 建立新队伍集合
  //       let openId = wx.getStorageSync('openId')
  //       let headuserInfo = this.data.userInfo
  //       let avatorUrl = this.data.fileID
  //       let teamName = this.data.teamNickName
  //       let teamSlogan = this.data.teamSlogan
  //       // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //       db.collection('team_list').add({
  //           // data 字段表示需新增的 JSON 数据
  //           data: {
  //             minutes: 0,
  //             teamId:openId,
  //             _id: openId,
  //             description: "用户运动团信息集合",
  //             avatorUrl: avatorUrl,
  //             teamName: teamName,
  //             teamSlogan: teamSlogan,
  //             sumSportsDayLong: 0,
  //             headuserInfo: headuserInfo,
  //             userInfo: [

  //             ]


  //           }
  //         })
  //         .then(res => {
  //           console.log(res)

  //         })
  //       wx.reLaunch({
  //         url: '/pages/memberlist/memberlist?host=1&teamid=' + openId
  //       })
  //     }
  //   })

  // },

  
})