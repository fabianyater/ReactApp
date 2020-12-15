import { createStore, applyMiddleware } from 'redux'
import reduxSaga from 'redux-saga'
import rootSaga from './rootSaga'
import rootReducer from './rootReducer'

const sagaMiddleware = reduxSaga()
const middleware = [sagaMiddleware]

export const store = createStore(rootReducer, applyMiddleware(...middleware))

sagaMiddleware.run(rootSaga)