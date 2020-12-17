import { combineReducers } from 'redux'
import { ComicReducer } from '../services/comics/comicSlice'

export default combineReducers({
  comics: ComicReducer,
})