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

  export const emailSignInStart = userCredentials => ({
    type: userTypes.EMAIL_LOGIN_START,
    payload: userCredentials
  });


  export const emailSignInSuccess = user=> ({
    type: userTypes.EMAIL_LOGIN_SUCCESS,
    payload: user
  });


  export const emailSignInFailure = error => ({
    type: userTypes.USER_ERROR,
    payload: error
  });


  export const googleSignInStart = code => ({
    type: userTypes.GOOGLE_SIGN_IN_START,
    payload: code
  });

  export const resetPasswordSuccess = () => ({
    type: userTypes.RESET_PASSWORD_SUCCESS,

  });


  export const logout = () => ({
    type: userTypes.SIGN_OUT_USER_START,   
  });


