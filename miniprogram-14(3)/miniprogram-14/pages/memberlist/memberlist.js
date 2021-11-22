// pages/memberlist/memberlist.js

var app = getApp(); //写在页面顶部page()外
let userInfoGetStatus = (app.globalData.userInfo == 0)
let teamStatus = true
let openId = wx.getStorageSync('openId')
let teamID = wx.getStorageSync('teamId')
let status =''
let host=''
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    // button弹窗数组
    user_info: {
      sportTeamStatus: true
    },
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    falg:false
  },
  //只有在本身没有加入队伍的情况下才会触发。
 async tapDialogButton(e) {
   
  if (userInfoGetStatus) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success:async (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        // app.globalData.userInfo = res.userInfo
        this.setData({
          user_Info: res.userInfo,
          hasUserInfo: true
        })
        let that = this
        let userInfo = wx.getStorageSync('userInfo')
         console.log(userInfo);
        console.log(e)
        //点击确定
        if (e.detail.index == 1) {
          this.setData({
            ['user_info.sportTeamStatus']: true
          })
          //更改特定用户的sportTeamStatus
          let res = await wx.cloud.callFunction({
            name:"attendteam",
           data:{
            teamid:teamID //拿到队伍id写入数据库user-record中，方便小队成员拿到自己的团队信息
           }
          })
          console.log(res);
          //往team-list中添加队员信息。
         let updatedata = await wx.cloud.callFunction({
           name:"team",
           data:{
            userInfo:userInfo,
            kind:'adddata'
           }
         })
         //下面是假数据但是没有影响，当用户点进去退出再进来拿到的就是真数据。
     
          let userarray = that.data.teamInfo.userInfo
          userarray.push(userInfo)
          that.setData({
            ['teamInfo.userInfo']: userarray
          })
          console.log('确认')
        } 
        else {
          console.log('取消')
        }
      },
      complete: async  (res) => {
  
      }
    })



  } 
  else {
    let user_detail_info = app.globalData.userInfo
    this.setData({
      user_Info: app.globalData.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync('userInfo', user_detail_info)
  }
  
 
   
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    wx.showLoading({
      title: '加载中',
    })
    teamID = options.teamid
    let openId = wx.getStorageSync('openId')
     host=options.host
    console.log(host);
    console.log(teamID);
    let resinfo=''
    //新增代码
     //判断用户是从链接进入还是小程序内进入
    //小程序进入host=1
    //链接进入host=0
    if(host==0){
      console.log("链接进入", options.teamid)
      //链接进入判断用户是否登录过，未登录过将数据写入数据库并提示授权信息。
      this.getopenid()
     }
     
    //用于存储渲染数据
    wx.setStorageSync('teamID', teamID)
    //拿到渲染数据
     let res=await wx.cloud.callFunction({
        name:"team",
        data:{
          teamID:teamID,
          kind:'renderdata' //无实际意义。作为标识
        }
      })
      console.log(res);
      resinfo = res.result.resinfo.data
      wx.hideLoading()
    console.log(resinfo);
   if(resinfo.length!=0) this.setData({
    teamInfo: resinfo[0],
    time: res.result.time
   })
   // 报错
   else{
    wx.showToast({
      title: '组队不存在请截图联系开发者',
      icon: 'none'
    })
     throw new Error("teamID输入错误或查无此数据")
     
   }
  },
  //检验是否授权
  checklogin:async function(){
    //无授权的情况下
    if(!app.globalData.userInfo.isAuthorize){
      console.log(new Date());
      console.log(2131123);
    return new Promise((resolve,reject) => {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success:(res) => {
          console.log(11)
          wx.setStorageSync('userInfo', res.userInfo)
          app.globalData.userInfo = res.userInfo
          this.setData({
            user_Info: res.userInfo,
            hasUserInfo: true
          })
          resolve(res.userInfo)
    }
  })
    })
}   
  },
  async getopenid(e) {
    console.log('我被调用了1111');
    let that = this;
    //拿到openid
    let { result } = await wx.cloud.callFunction({name: 'getOpenid'})
    const openid = result.OPENID
    wx.setStorageSync('openId', openid)
   //调用云函数判断进来的用户是否为新用户，如果是新用户则将数据写入数据库并返回注册信息。
   let addres=await wx.cloud.callFunction({
      name:"adduser",
      data:{
      id:res.result.OPENID
      }})
      console.log(addres.result);
     //是否已有队伍。
     if(addres.result.message=='未注册'){
      status = addres.result.resinfo[0].data.sportTeamStatus
     }
     else{
      status = addres.result.resinfo.data[0].sportTeamStatus
     } 
      this.setData({
        ['user_info.sportTeamStatus']:status
      })
    
      console.log(addres.result.message);

    //注册之后根据状态判断是否显示弹窗
   
      //未有队伍
     if(!status){
        console.log('加入队伍弹窗');
        wx.showModal({
          title: '提示',
          content: '是否加入该队伍？',
          success:async (res) => {
            if (res.confirm) {
              //往team-list中添加队员信息。
              this.checklogin().then(async(ress) => {
                this.setData({
                  ['user_info.sportTeamStatus']: true
                })
                //更改特定用户的sportTeamStatus
                let res = await wx.cloud.callFunction({
                  name:"attendteam",
                 data:{
                  teamid:teamID //拿到队伍id写入数据库user-record中，方便小队成员拿到自己的团队信息
                 }
                })
                const newMenber = {
                  ...ress,
                  _id: openid
                }
                console.log(res);
                console.log(this.data.user_info);
                let userarray = that.data.teamInfo.userInfo
                console.log(userarray);
                userarray.push(newMenber)
                that.setData({
                  ['teamInfo.userInfo']: userarray
                })
                console.log('确认')
                let updatedata = await wx.cloud.callFunction({
                  name:"team",
                  data:{
                   userInfo:newMenber,
                   teamID:teamID,
                   kind:'adddata'
                  }
                })
                console.log(updatedata);
               //下面是假数据但是没有影响，当用户点进去退出再进来拿到的就是真数据。
              
               return
              }).catch((res) => console.log(res) )
            }     
            else if (res.cancel) {
              console.log('用户点击取消')
              return
            }
          }
        })
        
      } 
      //已有队伍
      else{
        console.log('已有队伍');
        console.log(status,host);
          //已经有了自己的团队，用自己的数据渲染。
        if(status === true&&host==0){
          console.log(addres.result.resinfo.data[0].teamId);
          console.log(teamID);
          let teamid = addres.result.resinfo.data[0].teamId;
          console.log('我自己已经有队伍了');
            //自己的队伍与链接的队伍一致
            if(teamid===teamID){
              wx.showToast({
                title: '你已经在队伍中了',
                icon: 'none',
                duration: 2000
              })
              return
            }
           
           // 新增的个人字段。
            if(!teamid)  {
              console.error('teamid不存在请删除老的数据重新测试。');
              return
            }
            wx.showModal({
              title: '提示',
              content: '你已经有了自已的队伍。',
              showCancel:false,
              success:async (res)=> {
                if (res.confirm) {
                  wx.showLoading({
                    title: '加载中',
                  })
                  //拿到自己的teamid去请求数据。我新增的个人字段。
                  let renderdata = await wx.cloud.callFunction({
                    name:"team",
                    data:{
                      kind:renderdata,
                      teamID:teamid
                    }
                  })
                  this.onLoad({teamid,host:1})
                  console.log(renderdata);
                  resinfo =  renderdata.result.resinfo.data
                  console.log(resinfo[0]);
                  //重新给渲染数据赋值。
                  this.setData({
                    teamInfo: resinfo[0]
                   })
                   wx.hideLoading()
                  console.log(this.data.teamInfo);
                }
                 else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            
          }
      }
    
    console.log('执行完毕');
       
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let teamid = wx.getStorageSync('teamID')
 
    console.log(teamid);
    let title, imageUrl;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      title = "快来加入我的运动团！一起健康运动吧～"
      imageUrl = 'cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/forward/536b6797554640a4a66f831453883b9.png';
    } 
    if (res.from === 'menu') {
      title = "快来加入我们的运动队吧"
      imageUrl = 'cloud://yiming-0g0pnjw80bcc3577.7969-yiming-0g0pnjw80bcc3577-1305623497/forward/536b6797554640a4a66f831453883b9.png';
    }
    return {
      title: title,
      imageUrl: imageUrl, //这个是分享的图片
      path: '/pages/memberlist/memberlist?host=0&teamid=' + teamid

    }


  }
})