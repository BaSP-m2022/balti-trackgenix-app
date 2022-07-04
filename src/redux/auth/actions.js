import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  RESET_MESSAGE,
  SET_MODAL
} from './constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const getUserPending = () => {
  return {
    type: GET_USER_PENDING
  };
};

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  };
};

export const getUserError = (error) => {
  return {
    type: GET_USER_ERROR,
    payload: error
  };
};

export const registerPending = () => {
  return {
    type: REGISTER_PENDING
  };
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  };
};

export const registerError = (error) => {
  return {
    type: REGISTER_ERROR,
    payload: error
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};

export const setModal = (state) => {
  return {
    type: SET_MODAL,
    payload: state
  };
};
