import {applyMiddleware,createStore,compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import  rootSaga from './sagas'
import {requestFetchJobList} from './actions/jobAction'
const sagaMiddleware=createSagaMiddleware()
const middlewares=compose(applyMiddleware(sagaMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store=createStore(reducers,middlewares)
sagaMiddleware.run(rootSaga)
export default store
