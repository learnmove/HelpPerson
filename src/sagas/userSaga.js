import { take, put,takeLatest, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import {REQUEST_LOGIN,
  FETCH_LOGIN_FAILED,
  FETCH_LOGIN_SUCCESS
} from '../constant/userActionType'
import axios from 'axios'
import {fetchLogin} from '../api/api'
import {requestLogin,fetchLoginFailed,fetchLoginSuccess} from '../actions/userAction'
export  function *watchLogin(){
  while(true){

    const action=yield take('REQUEST_LOGIN')
    try{
      let data
      if(localStorage.getItem('user')){
         data=JSON.parse(localStorage.getItem('user'))

      }else{
         data= yield call(fetchLogin,action.data)
         data=data.data
        localStorage.setItem('user',JSON.stringify(data))
      }
      axios.defaults.headers.common ={'Authorization':'Bearer ' + data.token}
      yield put(fetchLoginSuccess(data))

    }catch(e){

      yield put(fetchLoginFailed(e.response.data))

    }
  }
}
