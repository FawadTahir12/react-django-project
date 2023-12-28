import { signUpUserStart, signUpUserSuccess } from './userActions'
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
          throw new Error('Signup failed');
        }
  
        const user = await response.json();
        dispatch(signUpUserSuccess(user));
      } catch (error) {
        // dispatch(signUpUserFailure(error.message)); // Dispatch action on signup failure
      }
    };
  };