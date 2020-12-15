import { fork, all } from 'redux-saga/effects'
import comicsSaga from '../services/comics/comicsSaga'

export default function* rootSaga() {
  yield all([
    fork(comicsSaga) 
  ])
}