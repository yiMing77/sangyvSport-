// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event);
  const {teamID,kind,userInfo} = event;
  console.log('云函数被执行了');
  console.log(teamID);
  const db = cloud.database()
  let renderdata = ''
  const _ = db.command
 if(kind == 'renderdata'){
  let time = 0
  renderdata = await db.collection("team_list").where({teamId: teamID}).get()
  const menberList = await db.collection("user_record").where({
    teamId: teamID
  }).get()
  menberList.data.forEach(item => {
    time = time + item.myOfTeamTime
  })
  // const idList = [renderdata.data[0].headuserInfo._id]
  // if(renderdata.data[0].userInfo.length !==0 ) {
  //   const menberId = renderdata.data[0].userInfo.map(item => item._id)
  //   idList.push(...menberId)
  // }
  // const time = await cloud.callFunction({
  //   name: 'AboutSportTime',
  //   data: {
  //     idList
  //   }
  // })
  return {
    time,
    resinfo:renderdata,
 }
 }
 if(kind == 'adddata'){
  renderdata = await db.collection('team_list').doc(teamID).update({
    data: {
      userInfo: _.push(userInfo),

    }// 表示指示数据库将字段自增 10
  })
  return{
    teamID:teamID,
    renderdata:renderdata
  }
 }
 
 
 
 
  
}