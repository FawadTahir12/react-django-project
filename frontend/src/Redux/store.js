import { configureStore} from '@reduxjs/toolkit';
import combineReducer from './combineReducer'
import {thunk} from 'redux-thunk';
import { applyMiddleware } from 'redux';


export default configureStore({
  reducer: combineReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
})