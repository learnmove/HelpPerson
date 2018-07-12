import {REQUST_FETCH_JOBLIST,
  FETCH_JOBLIST_SUCCESS,
  FETCH_JOB_CONTENT,
  FETCH_JOBLIST_Failed

} from '../../constant/jobActionType'
const JobReducers =(state={isLoading:false,data:null,success:true,errors:[]},action)=>{
  switch (action.type){
    case REQUST_FETCH_JOBLIST:
    return {...state,isLoading:true}
    break
    case FETCH_JOBLIST_SUCCESS:

    return {...state,isLoading:false,data:action.data,success:true}
    break
    case   FETCH_JOB_CONTENT:

    return {...state,isLoading:false,data:action.data}

    break
    case   FETCH_JOBLIST_Failed:

    return {...state,isLoading:false,errors:[action.data],success:false}

    break

    default:
    return state
    break

  }
}
export default JobReducers
