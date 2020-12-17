import { takeLatest, all, put } from 'redux-saga/effects'
import { comicActions } from './comicSlice'
import { Api } from '../../Common/api'

const fetchComics = async () => await Api()
  .then(res => res.json())
  .catch(err => {
    console.log("-------->", err)
    return err
  })

function* getComics() {

  const response = yield fetchComics();

  if (response) {
    yield put(comicActions.getComicsSuccess(response.data.results));
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