// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
   const db = cloud.database();
   if(event.kind == 'builtteam'){
     const {avatorUrl, teamName, teamSlogan,headuserInfo} = event
     //更新个人记录
    let userres = await db.collection("user_record").doc(wxContext.OPENID).update({
     data:{
      sportTeamStatus: true,
      teamId:wxContext.OPENID,
      _openid:wxContext.OPENID,
      sportTeamLeaderStatus:true,
      myOfTeamTime: 0
     }
    })
    
    //更新组队信息
    let addres = await db.collection('team_list').add({
      data:{
        _id:wxContext.OPENID,
        teamId:wxContext.OPENID,
        avatorUrl: avatorUrl,
        teamName: teamName,
        teamSlogan: teamSlogan,
        minutes: 0,
        description: "用户运动团信息集合",
        sumSportsDayLong: 0,
        headuserInfo: { ...headuserInfo, _id: wxContext.OPENID },
        userInfo: [
        ]
      }
    })
    return{
      userres:userres,
      addres:addres,
      openid:wxContext.OPENID
    }
   }
  //  if(event.kind == 'check'){
  //  let res =await db.collection('user_record').doc(wxContext.OPENID).get()
  //  return { res:res}
  //  }
  let res = await db.collection("user_record").doc(wxContext.OPENID).update({
      data:{
      sportTeamStatus: true,
      teamId:event.teamid
      }
    })

  return {
    message:res,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}