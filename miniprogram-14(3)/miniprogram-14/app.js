// app.js
App({
  globalData: {
    userInfo:0,  
    OPENID: "",
    openid: '33',
    qvyiming: 'nb',
    userInfo: null,
    sysInfo: null,
    windowW: null,
    windowH: null
  },
  async onLaunch() {
    wx.cloud.init({
      env: 'yiming-0g0pnjw80bcc3577',
      traceUser: true
    })
    // let userInfo = wx.getStorageSync('userInfo')
 
    this.jb()
    this.getSys();
    this.getopenid();
   const { result } = await wx.cloud.callFunction({ name: "login" })
   const { userInfo } = result
   console.error('用户信息',userInfo);
   wx.setStorageSync('teamId', userInfo.teamId || '')
   this.globalData.userInfo = userInfo
   
  
  },
  //通过Promise拿到openid
  //在这个页面没有调用。在视频播放那里进行调用返回一个Promise对象。
  useropenid(){
    return new Promise((resolve,reject) => {
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
          console.log('callFunction test result: ', res.result.OPENID)
          wx.setStorageSync('openId', res.result.OPENID)
          //这里的时候本地缓存已经有OPENID，调用resolve继续向下执行
          resolve( res.result.OPENID)
        },
  
      })
    })
  },
  getopenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('callFunction test result: ', res.result.OPENID)
        wx.setStorageSync('openId', res.result.OPENID)
        that.globalData.OPENID = res.result.OPENID
      },

    })

  },
  jb(){
    console.log('jb被调用了');
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(11)
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo=res.userInfo
        app.globalData.userInfo=res.userInfo
        this.setData({
          ['item.userInfo']: res.userInfo,
          ['item.hasUserInfo']: true
        })
      },
      fail:function(){
        console.log("调用失败")
      }
    })
  },
  
  //获取手机信息
  getSys: function () {
    var that = this;
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        // console.log(res.platform)
        //设置变量值
        that.globalData.sysInfo = res;
        that.globalData.windowW = res.windowWidth;
        that.globalData.windowH = res.windowHeight;
      }
    })
  }

})