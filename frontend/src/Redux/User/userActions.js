import userTypes from './userTypes';

export const signUpUserStart = userCredentials => ({
    type: userTypes.SIGN_UP_USER_START,
    payload: userCredentials
  });

export const signUpUserSuccess = user => ({
    type: userTypes.SIGN_UP_USER_SUCCESS,
    payload: user
  });

export const signUpUserFailure = user => ({
    type: userTypes.USER_ERROR,
    payload: user
  });

  export const googleSignInStart = code => ({
    type: userTypes.GOOGLE_SIGN_IN_START,
    payload: code
  });