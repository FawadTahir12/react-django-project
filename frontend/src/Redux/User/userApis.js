import { signUpUserStart, 
  signUpUserSuccess, 
  signUpUserFailure,
  googleSignInStart, 
  emailSignInStart, 
  emailSignInSuccess, 
  emailSignInFailure,
  resetPasswordSuccess } from './userActions'
import { BASE_BACKEND_URL } from '../../constants';


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
        if(user.access){
          dispatch(signUpUserSuccess(user));
          
        }
        
    } catch (error) {
      dispatch(signUpUserFailure(error.message))
    }
    };
  };




  export const loginWithEmail = userCredentials => {
    return async dispatch => {
      dispatch(emailSignInStart(userCredentials));
      
  
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/user/token/`, {
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
        dispatch(emailSignInSuccess(user));
      } catch (error) {
        dispatch(emailSignInFailure(error.message)); // Dispatch action on signup failure
      }
    };
  };






  export const sendForgotPasswordMail = email => {
    return async dispatch => { 
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/user/send-reset-password-mail/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(email)
        });
        
        if (!response.ok) {
          const error  = await response.json()
          throw new Error(error.error);
        }
        
        const user = await response.json();
        console.log(user, "user");
        dispatch(resetPasswordSuccess());
      } catch (error) {
        dispatch(emailSignInFailure(error.message)); // Dispatch action on signup failure
      }
    };
  };

