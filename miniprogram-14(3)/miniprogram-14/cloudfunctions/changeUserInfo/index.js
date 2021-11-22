// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  const wxContext = cloud.getWXContext()
  const { 
    type = 'defalut', 
    nowDay = '', 
    nowMonth = '', 
    timeLong = '',
    myOfTeamTime = '',
    weekDayPercentageData = 14.3,
    dataIndex = '',
    user_info= {}  } = event
  // 更改运动天数
  const { data } = await db.collection('user_record').doc(wxContext.OPENID).get()
  const userInfo = data
  if (type === 'changeDay') {
   const res = await db.collection('user_record').doc(wxContext.OPENID).update({
      data: {
        // 表示指示数据库将字段自增 10
        sportSumDay: _.inc(1),
        ['timeAnchor.day']: nowDay,
        ['timeAnchor.month']: nowMonth
      }
    })
  }
  // 更改运动时长
  if (type === 'changeTime') {
    const res = await db.collection('user_record').doc(wxContext.OPENID).update({
      data: {
        // 表示指示数据库将字段自增 10
        sumSportTimes: _.inc(1),
        myOfTeamTime,
        sportSumTimeLong: _.inc(timeLong),
        ['usePerCourseDetail.' + [dataIndex] + '.excersize_times']: _.inc(1)
      }
    })
    console.log(res);
  }
  // 更改运动天数的进度条
  if ( type === 'changeProgressBar' ) {
    await db.collection('user_record').doc(wxContext.OPENID).update({
      data: {
        // 表示指示数据库将字段自增 10
        weekDayPercentageData: _.inc(weekDayPercentageData)
      }
    })
  }
  // 更改授权信息
  if(type === 'changeAuthorize') {
    await db.collection('user_record').doc(wxContext.OPENID).update({
      data: {
        // 表示指示数据库将字段自增 10
        isAuthorize: true
      }
    })
  }
  
  return {
    userInfo
  }
}