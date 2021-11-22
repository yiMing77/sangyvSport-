// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  let item ={}
 let  user_info ={}
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

 let rescourse =await db.collection('course_list').where({ _id: event.coursename }).get()
   item = rescourse.data[0]?rescourse.data[0]:'资源失效'
 console.log(rescourse.data[0]);

 let resuser = await db.collection('user_record').doc(wxContext.OPENID).get()
   console.log(resuser.data);
   user_info  = resuser.data?resuser.data:'资源失效'
   console.log(event.user_detail);
 console.log( typeof event.user_detail);
 if(typeof event.user_detail === 'object'){
  let resupdate = await  db.collection('user_record').doc(wxContext.OPENID).update({
    data:{
     user_detail:event.user_detail
    }
  })
  console.log(resupdate);
 }
 
  
  return {
    item,user_info
  }
}