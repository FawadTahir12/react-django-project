import  userTypes  from './userTypes.js';

const initialState = {
  loading: false,
  user: null,
  error: null
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
    // case userTypes.SIGN_UP_USER_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //     user: null
    //   };
    default:
      return state;
  }
};

export default userReducer;