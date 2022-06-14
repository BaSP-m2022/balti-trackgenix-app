import {
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  EDIT_PROJECT_PENDING,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  GET_SINGLE_PROJECT_ERROR,
  GET_SINGLE_PROJECT_PENDING,
  GET_SINGLE_PROJECT_SUCCESS,
  RESET_PROJECT,
  RESET_MESSAGE,
  FORMATED_PROJECT
} from './constants';

export const getSingleProjectPending = () => {
  return {
    type: GET_SINGLE_PROJECT_PENDING
  };
};

export const getSingleProjectSuccess = (data) => {
  return {
    type: GET_SINGLE_PROJECT_SUCCESS,
    payload: data
  };
};

export const getSingleProjectError = (error) => {
  return {
    type: GET_SINGLE_PROJECT_ERROR,
    payload: error
  };
};

export const addProjectPending = () => {
  return {
    type: ADD_PROJECT_PENDING
  };
};

export const addProjectSuccess = (data) => {
  return {
    type: ADD_PROJECT_SUCCESS,
    payload: data
  };
};

export const addProjectError = (error) => {
  return {
    type: ADD_PROJECT_ERROR,
    payload: error
  };
};

export const editProjectPending = () => {
  return {
    type: EDIT_PROJECT_PENDING
  };
};

export const editProjectSuccess = (data) => {
  return {
    type: EDIT_PROJECT_SUCCESS,
    payload: data
  };
};

export const editProjectError = (error) => {
  return {
    type: EDIT_PROJECT_ERROR,
    payload: error
  };
};

export const resetProject = () => {
  return {
    type: RESET_PROJECT
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};

export const formatedProject = (data) => {
  return {
    type: FORMATED_PROJECT,
    payload: data
  };
};
