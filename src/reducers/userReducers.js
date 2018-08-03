import {REQUEST_LOGIN,
  FETCH_LOGIN_FAILED,
  FETCH_LOGIN_SUCCESS

} from '../constant/userActionType'
const UserReducers =(state={isLoading:false,data:{user:null},success:true,errors:[]},action)=>{
  console.log(action.data)
  switch (action.type){
    case REQUEST_LOGIN:
    return {...state,isLoading:true}
    break
    case FETCH_LOGIN_SUCCESS:
    return {...state,isLoading:false,data:{...action.data},success:true}
    break
    case   FETCH_LOGIN_FAILED:
    return {...state,isLoading:false,data:action.data,success:false}

    break
    default:
    return state
    break

  }
}
export default UserReducers
