import {applyMiddleware,createStore,compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import  rootSaga from './sagas'
import {requestFetchJobList} from './actions/jobAction'
const sagaMiddleware=createSagaMiddleware()
const middlewares=compose(applyMiddleware(sagaMiddleware))
const store=createStore(reducers,middlewares)
sagaMiddleware.run(rootSaga)
export default store
