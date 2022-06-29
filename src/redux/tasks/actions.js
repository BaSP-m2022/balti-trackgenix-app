import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_SINGLE_TASK_PENDING,
  GET_SINGLE_TASK_SUCCESS,
  GET_SINGLE_TASK_ERROR,
  ADD_TASK_PENDING,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  EDIT_TASK_PENDING,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  RESET_TASK,
  RESET_MESSAGE,
  SET_MODAL
} from './constants';

// === GET ALL TASKS === //
export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: data
  };
};

export const getTasksFailed = (error) => {
  return {
    type: GET_TASKS_ERROR,
    payload: error
  };
};

// === GET SINGLE TASK === //
export const getSingleTaskPending = () => {
  return {
    type: GET_SINGLE_TASK_PENDING
  };
};

export const getSingleTaskSuccess = (data) => {
  return {
    type: GET_SINGLE_TASK_SUCCESS,
    payload: data
  };
};

export const getSingleTaskFailed = (message) => {
  return {
    type: GET_SINGLE_TASK_ERROR,
    payload: message
  };
};

// === CREATE TASK === //
export const addTaskPending = () => {
  return {
    type: ADD_TASK_PENDING
  };
};

export const addTaskSuccess = (data) => {
  return {
    type: ADD_TASK_SUCCESS,
    payload: data
  };
};

export const addTaskFailed = (message) => {
  return {
    type: ADD_TASK_ERROR,
    payload: message
  };
};

// === UPDATE TASK === //
export const editTaskPending = () => {
  return {
    type: EDIT_TASK_PENDING
  };
};

export const editTaskSuccess = (data) => {
  return {
    type: EDIT_TASK_SUCCESS,
    payload: data
  };
};

export const editTaskFailed = (message) => {
  return {
    type: EDIT_TASK_ERROR,
    payload: message
  };
};

// === DELETE TASK === //
export const deleteTaskPending = () => {
  return {
    type: DELETE_TASK_PENDING
  };
};

export const deleteTaskSuccess = (id) => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: id
  };
};

export const deleteTaskFailed = (message) => {
  return {
    type: DELETE_TASK_ERROR,
    payload: message
  };
};

// === FORM ACTIONS === //
export const resetTask = () => {
  return {
    type: RESET_TASK
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
