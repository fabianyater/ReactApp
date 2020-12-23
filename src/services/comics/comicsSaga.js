import { takeLatest, all, put } from 'redux-saga/effects'
import { comicActions } from './comicSlice'
import { Api } from '../../Common/api'

const fetchComics = async () => await Api()

function* getComics() {

  const response = yield fetchComics();

  if (response) {
    const data = {
      newComics: response.data.results,
      reviewComics: [],
      approvedComics: []
    }
    yield put(comicActions.setComics(data))
  } else {
    yield put(comicActions.getComicsError(
      {
        codigo: "",
        message: ""
      }
    ))
  }
}

function* actionWatcher() {
  yield takeLatest(comicActions.getComics, getComics)
}

export default function* comicsSaga() {
  yield all([actionWatcher()])
}