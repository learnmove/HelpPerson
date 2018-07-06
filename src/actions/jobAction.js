import {REQUST_FETCH_JOBLIST,
  FETCH_JOBLIST_SUCCESS,
  FETCH_JOB_CONTENT,
  FETCH_JOBLIST_Failed
} from '../constant/jobActionType'
export const requestFetchJobList=(data)=>{
  return{
    type:REQUST_FETCH_JOBLIST,
    data
  }
}
export const fetchJobListSucess=(data)=>{
  return{
    type:FETCH_JOBLIST_SUCCESS,
    data
  }
}
export const fetchJobContent=(data)=>{
  return{
    type:  FETCH_JOB_CONTENT,
    data
  }
}
export const fetchJobListFailed=(data)=>{
  return{
    type:  FETCH_JOBLIST_Failed,
    data
  }
}
