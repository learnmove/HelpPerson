import axios from 'axios'
export const host='http://localhost/laravel/recruit/public/api/'
export const GetJob=`http://192.168.0.2/laravel/recruit/public/api/job`
export const GetUser=`http://localhost/laravel/recruit/public/api/auth`
export const apply=`apply`
// job
export const fetchJobList=(data)=>{
  console.log("dffffffffffffff")
  return axios.get(`${GetJob}${data}`)
}
export const fetchJobContent= async (id)=>{
  console.log(id)
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
