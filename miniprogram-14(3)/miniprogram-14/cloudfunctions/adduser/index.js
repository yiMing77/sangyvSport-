// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  let resinfo =''
  console.log(event.id);
  let isnew = await db.collection('user_record').where({_id:event.id}).get()
  console.log(isnew);
  if(isnew.data.length!=0){
   return{
    message:'已注册',
    resinfo:isnew
   }
  }
  else{
    resinfo = await db.collection('user_record').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: wxContext.OPENID, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          sportTeamLeaderStatus: false,
          sportTeamStatus: false,
          addTeamSportTime: 0,
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
    let userinfo = await db.collection("user_record").doc(wxContext.OPENID).get()

     
      return {
         resinfo:[userinfo],
         message:"未注册"
        
      }
  }
  
}