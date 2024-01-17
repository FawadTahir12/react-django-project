import { configureStore } from '@reduxjs/toolkit';
import combineReducer from './combineReducer'
export default configureStore({
  reducer: combineReducer
})