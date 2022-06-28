import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  RESET_MESSAGE
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: '',
  authenticated: undefined,
  user: undefined
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: action.payload,
        error: false,
        message: 'Successful login'
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
        isLoading: false
      };
    case GET_USER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        error: false,
        user: action.payload,
        isLoading: false
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: true,
        isLoading: false,
        message: action.payload
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
};
