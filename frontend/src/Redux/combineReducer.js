import { combineReducers } from 'redux';

import userReducer from './User/userReduser';


const combineReducer = combineReducers({
  user: userReducer,
});

export default combineReducer;