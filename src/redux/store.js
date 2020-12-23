import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reduxSaga from 'redux-saga'
import rootSaga from './rootSaga'
import rootReducer from './rootReducer'
import logger from 'redux-logger'

const sagaMiddleware = reduxSaga()

const middleware = [
  ...getDefaultMiddleware({ thunk: false })
    .concat(sagaMiddleware)
    .concat(logger)
]

export const store = configureStore({ reducer: rootReducer, middleware })

sagaMiddleware.run(rootSaga)