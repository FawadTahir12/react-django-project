import  userTypes  from './userTypes.js';

const initialState = {
  loading: false,
  user: null,
  error: null,
  code: '',
  emailRecovery: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SIGN_UP_USER_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case userTypes.SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null
      };
    case userTypes.GOOGLE_SIGN_IN_START:
      return {
        ...state,
        loading: true,
        code: action.payload,
        user: null,
        error: null
      };
    case userTypes.EMAIL_LOGIN_START:
      return {
        ...state,
        loading: true,
        code: null,
        user: action.payload,
        error: null
      };
    case userTypes.EMAIL_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        code: null,
        user:action.payload,
        error: null
      };
    case userTypes.SIGN_OUT_USER_START:
      return {
        ...state,
        ...initialState
        
        };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        emailRecovery: true
        
        };
    default:
      return state;
  }
};

export default userReducer;