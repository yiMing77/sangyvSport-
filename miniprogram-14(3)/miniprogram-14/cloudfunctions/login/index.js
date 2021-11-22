// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let res
  try {
    res = await db.collection('user_record').doc('o-Qts5OicXW_SfSi_JQZK5O8rdeA').get()
    console.log(res.data);
  }catch(e){
    await db.collection('user_record').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: wxContext.OPENID, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        sportTeamLeaderStatus: false,
        sportTeamStatus: false,
        myOfTeamTime: 0,
        isAuthorize: false,
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
      }})
    res = await db.collection("user_record").doc(wxContext.OPENID).get()
    console.log(res);
  }
 
  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  

  return {
    userInfo: res.data
  }
}

