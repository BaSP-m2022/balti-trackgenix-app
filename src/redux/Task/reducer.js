import {
  GET_TASKS_PENDING,
  GET_TASKS_FULFILLED,
  GET_TASKS_FAILED,
  GET_SINGLE_TASK_PENDING,
  GET_SINGLE_TASK_FULFILLED,
  GET_SINGLE_TASK_FAILED,
  CREATE_TASK_PENDING,
  CREATE_TASK_FULFILLED,
  CREATE_TASK_FAILED,
  UPDATE_TASK_PENDING,
  UPDATE_TASK_FULFILLED,
  UPDATE_TASK_FAILED,
  DELETE_TASK_PENDING,
  DELETE_TASK_FULFILLED,
  DELETE_TASK_FAILED,
  RESET_TASK
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: '',
  task: {},
  list: []
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_TASK_PENDING:
      return { ...state, isLoading: true };
    case GET_SINGLE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: action.payload.data,
        message: action.payload.message
      };
    case GET_SINGLE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case CREATE_TASK_PENDING:
      return { ...state, isLoading: true };
    case CREATE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: action.payload.data,
        message: action.payload.message
      };
    case CREATE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case UPDATE_TASK_PENDING:
      return { ...state, isLoading: true };
    case UPDATE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: action.payload.data,
        message: action.payload.message
      };
    case UPDATE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case RESET_TASK:
      return {
        ...state,
        task: {}
      };
  }
};
