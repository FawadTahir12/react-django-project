import { signUpUserStart, signUpUserSuccess, signUpUserFailure,googleSignInStart } from './userActions'
import { BASE_BACKEND_URL,REACT_APP_GOOGLE_CLIENT_ID,REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT } from '../../constants';
import { useCallback } from 'react';
import axios from 'axios';

export const signUpUserAsync = userCredentials => {
    return async dispatch => {
      dispatch(signUpUserStart(userCredentials));
  
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/user/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userCredentials)
        });
  
        if (!response.ok) {
          const error  = await response.json()
          throw new Error(error.error);
        }
  
        const user = await response.json();
        dispatch(signUpUserSuccess(user));
      } catch (error) {
        dispatch(signUpUserFailure(error.message)); // Dispatch action on signup failure
      }
    };
  };

  export const googleSignIN = code => {
    
    return async dispatch => {
      dispatch(googleSignInStart(code));
  
      try {
        const res = await fetch(`${BASE_BACKEND_URL}/user/login/google/${code}`,
        {
          method: 'GET'
        })
        const user = await res.json();
        if(user.access_token){
          dispatch(signUpUserSuccess(user));
        }
        
    } catch (error) {
      dispatch(signUpUserFailure(error.message))
    }
    };
  };