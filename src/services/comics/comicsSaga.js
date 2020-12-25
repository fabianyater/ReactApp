import { takeLatest, all, put } from 'redux-saga/effects'
import { comicActions } from './comicSlice'
import Api from '../../Common/api'
import { message } from 'antd'

function* getComics() {

  const response = yield Api.get('/comics/all');

  if (response.ok) {
    const data = {
      newComics: response.payload,
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

function* addComics({ payload }) {

  const { values, hide } = payload

  const response = yield Api.post('/comics', values);

  if (response.ok) {
    yield put(comicActions.getComics())
    hide()
    message.success("¡Comic agregado correctamente! ✔ ")
  } else {
    yield put(comicActions.getComicsError({ codigo: "", message: response.payload.message }))
    message.error("¡Comic no registrado correctamente! ❌" + response.payload.message)
  }
}

function* editComics({ payload }) {

  const { values, id } = payload

  console.log("Id para editar: ", id)

  const response = yield Api.put(`/comics/${id}`, values);

  if (response.ok) {
    message.success('¡Comic actualizado! ✔')
  } else {
    yield put(comicActions.getComicsError({ codigo: "", message: response.payload.message }))
    message.warning("¡Hubo un error! ❌" + response.payload.message)
  }
}

function* deleteComics({ payload }) {

  const response = yield Api.delete(`/comics/${payload.id}`);

  if (response.ok) {
    message.warning("¡Comic eliminado! ❗ ")
  } else {
    yield put(comicActions.getComicsError({ codigo: "", message: response.payload.message }))
    message.error("¡Hubo un error! ❌" + response.payload.message)
  }
}

function* actionWatcher() {
  yield takeLatest(comicActions.getComics, getComics)
  yield takeLatest(comicActions.addComic, addComics)
  yield takeLatest(comicActions.editComic, editComics)
  yield takeLatest(comicActions.deleteComic, deleteComics)
}

export default function* comicsSaga() {
  yield all([actionWatcher()])
}