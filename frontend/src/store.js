import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/AuthSlice.js'
import favoritesReducer from './redux/FavSlice.js'
export default configureStore({
  reducer: {
      auth: authReducer,
      favorites: favoritesReducer,
  },
})