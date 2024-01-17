import { combineReducers } from 'redux';

import userReducer from './User/userReduser';


const combineReducer = combineReducers({
  userState: userReducer,
});

export default combineReducer;