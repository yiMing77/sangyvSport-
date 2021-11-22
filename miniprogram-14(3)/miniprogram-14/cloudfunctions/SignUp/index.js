// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { kind, userInfo } = event
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let res = ''
  if(kind === 'authorize') {
    res = await db.collection("user_record").doc(wxContext.OPENID).update({
      data: {
        isAuthorize: true,
        userInfo: userInfo
      }
    })
  }
  const newUserInfo = await db.collection("user_record").doc(wxContext.OPENID).get()
  return {
    res,
    userInfo: newUserInfo
  }
}