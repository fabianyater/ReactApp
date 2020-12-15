import { takeLatest, all, put } from 'redux-saga/effects'
import * as ComicsTypes from './comicTypes'
import { Api } from '../../Common/api'

const fetchComics = async () => await Api()
  .then (res => res.json())
  .catch(err => {
    console.log("-------->", err)
    return err
  })

function* getComics(action) {
  const response = yield fetchComics();

  if (response) {
    console.log("Entró", response);
    yield put({
      type: ComicsTypes.GET_COMICS_SUCCESS,
      payload: { comics: response.data.results },
    });
  } else {
    yield put({
      type: ComicsTypes.GET_COMICS_FAIL,
      error: {
        codigo: '',
        message: ''
      }
    })
  }
}

function* actionWatcher() {
  yield takeLatest(ComicsTypes.GET_COMICS, getComics)
}

export default function* comicsSaga() {
  yield all([actionWatcher()])
}