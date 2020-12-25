import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comics: {
    newComics: [], reviewComics: [], approvedComics: []
  },
  loading: false,
  error: null,
  selected: null,
}

const ComicSlice = createSlice(
  {
    name: "comic",
    initialState,
    reducers: {
      getComics(state) { state.loading = true },
      setComics(state, { payload }) {
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
      addComic(state) {
        state.loading = true
      },
      deleteComic(state){
        state.loading = true
      },
      editComic(state){
        state.loading = true
      }
    }
  }
)

const comicActions = ComicSlice.actions
const ComicReducer = ComicSlice.reducer

export { comicActions, ComicReducer }

export default ComicReducer