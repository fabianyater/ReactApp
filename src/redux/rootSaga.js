import comicsSaga from '../services/comics/comicsSaga'
import { fork, all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    fork(comicsSaga) 
  ])
}