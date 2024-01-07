import React, { useState, useEffect , useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useLocation, useHistory, useNavigate } from 'react-router-dom';
import queryString from "query-string";
import axios from "axios"; 
import { REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT, REACT_APP_GOOGLE_CLIENT_ID , BASE_BACKEND_URL} from '../../constants';
// import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';

import './style.scss';

import AuthWrapper from '../AuthWrapper/index';
import FormInput from '../forms/FormInput/index';
import Button from '../forms/Button/index';

// const mapState = ({ user }) => ({
//   currentUser: user.currentUser
// });

const SignIn = props => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

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

const openGoogleLoginPage = useCallback((e) => {
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
    console.log(url);

    window.location.href = url;
},[]);

  const configAuthWrapper = {
    headline: 'LogIn'
  };







  let location = useLocation();
  console.log("location", location);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code ? values.code : null;

    if (code) {
      onGogglelogin();
    }
  }, []);

  const googleLoginHandler = (code) => {
    return axios
      .get(`${BASE_BACKEND_URL}/user/login/google/${code}`)
      .then((res) => {
        localStorage.setItem("goggleFirstName", res.data.user.first_name);
        return res.data;
      })
      .catch((err) => {
        setError(err);
        return err;
      });
  };

  const onGogglelogin = async () => {
    const response = await googleLoginHandler(location.search);
    console.log(response.data);
    // if (response.data.access) {
    //   navigate("/");
    // }
  }

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