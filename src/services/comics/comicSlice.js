import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comics: [],
  loading: false,
  error: null,
  selected: null,
  isBuscado: null,
}

const ComicSlice = createSlice(
  {
    name: "comic",
    initialState,
    reducers: {
      getComics(state) { state.loading = true },
      getComicsSuccess(state, { payload }) {
        state.comics = payload
        state.loading = false
      },
      getComicsError(state, { payload }) {
        state.error = payload
        state.loading = false
      },
      getSelecetedComic(state, { payload }) {
        state.selected = payload
      },
      addComic(state, { payload }) {
        state.comics = [payload, ...state.comics]
      }
    }
  }
)

const comicActions = ComicSlice.actions
const ComicReducer = ComicSlice.reducer

export { comicActions, ComicReducer }

export default ComicReducer