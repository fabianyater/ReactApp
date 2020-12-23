import { ComicReducer } from '../services/comics/comicSlice'
import { combineReducers } from 'redux'

export default combineReducers({
  comics: ComicReducer,
})