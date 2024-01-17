import React, { useState, useEffect , useCallback, memo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useLocation, useHistory, useNavigate } from 'react-router-dom';
import {googleSignIN} from '../../Redux/User/userApis'
import queryString from "query-string";
import axios from "axios"; 
import { REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT, REACT_APP_GOOGLE_CLIENT_ID , BASE_BACKEND_URL} from '../../constants';
// import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';

import './style.scss';

import AuthWrapper from '../AuthWrapper/index';
import FormInput from '../forms/FormInput/index';
import Button from '../forms/Button/index';

const getUser = (state) => ({
  currentUser: state.userState.user
});

const SignIn = ()=> {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUser);

  let location = useLocation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [values,setValues] = useState(queryString.parse(location.search));
  const  [code, setCode] = useState(null)

  useEffect(() => {
    setCode(values.code ? values.code : null)
  },[values])

//   useEffect(() => {
//     if (currentUser) {
//       resetForm();
//       history.push('/');
//     }

//   }, [currentUser]);

//   const resetForm = () => {
//     setEmail('');
//     setPassword('');
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     dispatch(emailSignInStart({ email, password }));
//   }

//   const handleGoogleSignIn = () => {
//     dispatch(googleSignInStart());
//   }
const openGoogleLoginPage = (e) => {
    e.preventDefault();
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

    window.location.href = url;
};

  const configAuthWrapper = {
    headline: 'LogIn'
  };


 console.log(currentUser, 'currentuser' );


  const onGogglelogin =  () => {
    dispatch(googleSignIN(location.search))
    // if (currentUser?.user) {
    //   navigate("/");
    // }
  }
  useEffect(() => {
    console.log("hello");
    if (code) {
      
      onGogglelogin();
    }
  }, [code]);

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
      {/* onSubmit={handleSubmit} */}
        <form >

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            // handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            // handleChange={e => setPassword(e.target.value)}
          />

          <Button type="submit">
            LogIn
          </Button>

          <div className="socialSignin">
            <div className="row">
            
              <Button onClick={openGoogleLoginPage}>
                Sign in with Google
              </Button>
            </div>
          </div>

          <div className="links">
            <Link to="/registration">
              Register
            </Link>
            {` | `}
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>

        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;