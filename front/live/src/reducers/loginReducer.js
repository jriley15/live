import constants from '../constants/loginConstants';

const initialState = {
  loggingIn: false,
  errors: [],
  authenticated: false,
  authToken: ''
};

export const reducer = (state, action) => {

  state = state || initialState;

  switch (action.type) {

    case constants.LOGIN_REQUEST:

      return {
        ...state,
        loggingIn: true,
        errors: []
      };

    case constants.LOGIN_SUCCESS:
      
      return {
        ...state,
        authenticated: true,
        loggingIn: false,
        errors: [],
        authToken: action.authToken
      };

    case constants.LOGIN_FAILURE:
      return {
        ...state,
        errors: action.errors,
        authenticated: false,
        loggingIn: false
      };
    case constants.AUTH_FOUND:
      return {
        ...state,
        authenticated: true,
        authToken: action.authToken
      };
    case constants.LOGOUT:
      return {
        initialState
      };
    default:
      return state;
  }

};

export default reducer;