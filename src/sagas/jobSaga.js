import { take, put,takeLatest, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios'
import {REQUST_FETCH_JOBLIST} from '../constant/jobActionType'
import {fetchJobList} from '../api/api'
import {fetchJobListSucess} from '../actions/jobAction'
import {fetchJobListFailed} from '../actions/jobAction'

 export function *getJobList(){
while(true){
  const action=yield take('REQUST_FETCH_JOBLIST')
  try{
    const {data}= yield call(fetchJobList,action.data)
    yield put(fetchJobListSucess(data))
  }catch(e){
    yield put(fetchJobListFailed(e.response.data))

  }
}


}
