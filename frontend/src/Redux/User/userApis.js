import { signUpUserStart, signUpUserSuccess, signUpUserFailure,googleSignIn } from './userActions'
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



 export  const openGoogleLoginPage =(e) => {
    // e.preventDefault();
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/auth";
    
    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = new URLSearchParams({
      response_type: "code",
      client_id: REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: `${REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT}/login`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    });

    const url = `${googleAuthUrl}?${params}`;
    console.log(url);

    window.location.href = url;
}
const googleLoginHandler = (code) => {
  return axios
    .get(`${BASE_BACKEND_URL}/user/login/google/${code}`)
    .then((res) => {
      localStorage.setItem("goggleFirstName", res.data.user.first_name);
      return res.data;
    })
    .catch((err) => {
      return err;
    })
};
export const onGogglelogin = code=>{
  return async dispatch => {
    dispatch(googleSignIn(code)); 

    try{
      // const response = await googleLoginHandler(code);
      // console.log(response.data);
      // if (response.data.access) {
      //   navigate("/");
      // }
    }catch(e){
  
    }
  }

  
}