import userTypes from './userTypes';

export const signUpUserStart = userCredentials => ({
    type: userTypes.SIGN_UP_USER_START,
    payload: userCredentials
  });

export const signUpUserSuccess = user => ({
    type: userTypes.SIGN_UP_USER_SUCCESS,
    payload: user
  });