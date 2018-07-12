import { take, put,takeLatest, call, fork, select, takeEvery, all } from 'redux-saga/effects'

import  {getJobList} from './jobSaga'
import  {watchLogin} from './userSaga'


export default function* rootSaga(){
  yield  fork( getJobList)

  yield  fork( watchLogin )


}
