import axios from 'axios'
export const GetJob=`http://192.168.0.2/laravel/recruit/public/api/job`
export const GetUser=`http://192.168.0.2/laravel/recruit/public/api/auth/facebook`

export const fetchJobList=(data)=>{
  return axios.get(`${GetJob}${data}`)
}
export const fetchJobContent= async (id)=>{
  console.log(id)
  return axios.get(`${GetJob}/${id}`)
}
