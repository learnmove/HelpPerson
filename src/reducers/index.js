import {combineReducers} from 'redux'
import JobReducers from './job/JobReducers'
import UserReducers from './userReducers'

export default combineReducers({
  JobReducers,
  UserReducers
})
