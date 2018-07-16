import axios from 'axios'
export const host='http://localhost/laravel/recruit/public/api/'
export const GetJob=`http://192.168.0.2/laravel/recruit/public/api/job`
export const GetUser=`http://localhost/laravel/recruit/public/api/auth`
export const apply=`apply`
export const user=`user`

// job
export const fetchJobList=(data)=>{
  return axios.get(`${GetJob}${data}`)
}
export const fetchJobContent= async (id)=>{
  var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};
  return axios.get(`${GetJob}/${id}`,{headers:{ Authorization:'aaa'}})
}
export const applyJob= async ({job_id,content})=>{
 
  return axios.post(`${host}${apply}`,{job_id,content})
}
// user
export const fetchLogin= async (data)=>{
  let birthday=data.birthday
  let date=new Date()
  birthday=date.getFullYear()-(birthday).split('/')[2]
  const {userID,name,email,picture:{data:{url}}}=data
  console.log(birthday)
  return axios.post(`${GetUser}`,{
    birthday,
userID,name,email,url
  })
}
export const modifyUserDetailApi= async (data)=>{
  console.log(data)
  return axios.post(`${host}${user}`,{
    content:data.content,
    profession:data.profession,
    experience:data.experience,
    name:data.name,
    school:data.school,
  })
}
export const fetchUserData=async (id)=>{
  console.log("dffffffffffffff")
  return axios.get(`${host}${user}/${id}`)
}