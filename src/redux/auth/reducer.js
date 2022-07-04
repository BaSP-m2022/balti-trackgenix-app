import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET_MESSAGE,
  SET_MODAL
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: '',
  authenticated: undefined,
  user: undefined,
  showModal: false
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
    case REGISTER_PENDING:
      return {
        ...state,
        message: 'Loading...'
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        authenticated: action.payload.data,
        error: false,
        message: action.payload.message
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case SET_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    default:
      return state;
  }
};
