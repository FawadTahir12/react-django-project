import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUserAsync } from '../../Redux/User/userApis'
import './style.scss';

import AuthWrapper from '../AuthWrapper/index';
import FormInput from '../forms/FormInput/index';
import Button from '../forms/Button/index';

const getUser = (state) => ({
  currentUser: state.userState.user
});

const Signup = props => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { currentUser, userErr } = useSelector(getUser);

  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (currentUser) {
      reset();
      nav('/');
    }

  }, [currentUser]);

  useEffect(() => {
    if (userErr && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);

  const reset = () => {
    setfullname('');  
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const userData = {
      'full_name': fullname,
      'email': email,
      'password': password,
      'confirmPassword': confirmPassword
    }
    dispatch(signUpUserAsync(userData));
  }

  const configAuthWrapper = {
    headline: 'Registration'
  };


  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors}   
          </ul>
        )}
        <form onSubmit={handleFormSubmit}> 

          <FormInput
            type="text"
            name="displayName"
            value={fullname}
            placeholder="Full name"
            handleChange={e => setfullname(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">
            Register
          </Button>
        </form>

        <div className="links">
          <Link to="/login">
            LogIn
          </Link>
          {` | `}
          <Link to="/recovery">
            Reset Password
            </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Signup;