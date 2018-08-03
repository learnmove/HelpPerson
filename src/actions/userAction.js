
import {REQUEST_LOGIN,
  FETCH_LOGIN_FAILED,
  FETCH_LOGIN_SUCCESS
} from '../constant/userActionType'
export const requestLogin=(data)=>{
  return {
    type:REQUEST_LOGIN,
    data
  }
}
export const fetchLoginSuccess=(data)=>{
  return {
    type:FETCH_LOGIN_SUCCESS,
    data
  }
}
export const fetchLoginFailed=(data)=>{
  return {
    type:FETCH_LOGIN_FAILED,
    data
  }
}
