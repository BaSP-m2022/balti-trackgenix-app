import {
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_ERROR,
  GET_SINGLE_SUPER_ADMIN_SUCCESS,
  GET_SINGLE_SUPER_ADMIN_PENDING,
  GET_SINGLE_SUPER_ADMIN_ERROR,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_ERROR,
  ADD_SUPER_ADMIN_SUCCESS,
  ADD_SUPER_ADMIN_PENDING,
  ADD_SUPER_ADMIN_ERROR,
  EDIT_SUPER_ADMIN_SUCCESS,
  EDIT_SUPER_ADMIN_PENDING,
  EDIT_SUPER_ADMIN_ERROR,
  SUPER_ADMIN_MODAL,
  RESET_MESSAGE,
  RESET_SUPER_ADMIN
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  message: '',
  error: false,
  superAdmin: undefined
};

export const superAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_SUPER_ADMINS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: true
      };
    case GET_SINGLE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdmin: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          isActive: action.payload.data.isActive
        },
        isLoading: false,
        message: action.payload.message,
        error: false
      };
    case GET_SINGLE_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SINGLE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: true
      };
    case DELETE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        message: 'Super Admin deleted',
        isLoading: false,
        list: state.list.filter((superAdmin) => superAdmin._id !== action.payload),
        showModal: true,
        error: false
      };
    case DELETE_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
        error: true,
        list: action.payload
      };
    case ADD_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdmin: action.payload.data,
        isLoading: false,
        message: action.payload.message,
        error: false
      };
    case ADD_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case ADD_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: true
      };
    case EDIT_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdmin: action.payload.data,
        isLoading: false,
        message: action.payload.message,
        error: false
      };
    case EDIT_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case EDIT_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: true
      };
    case SUPER_ADMIN_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case RESET_SUPER_ADMIN:
      return {
        ...state,
        superAdmin: undefined
      };
    default:
      return state;
  }
};
