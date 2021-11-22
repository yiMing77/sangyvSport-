// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  const wxContext = cloud.getWXContext()
  const { dataIndex, status } = event
  const res =await db.collection('user_record').doc(wxContext.OPENID).update({
    data: {
      ['usePerCourseDetail.' + [dataIndex] + '.subscibe_status']: status
    }
  })
  const userInfo = await db.collection('user_record').doc(wxContext.OPENID).get()
  console.log(res);
  return {
    userInfo: userInfo.data
  }
}