import { take, put,takeLatest, call, fork, select, takeEvery, all } from 'redux-saga/effects'

import  {getJobList} from './jobSaga'

export default function* rootSaga(){
  while(true){

    yield all([
      getJobList(),
    ])
  }

}
