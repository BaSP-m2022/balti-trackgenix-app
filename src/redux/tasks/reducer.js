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

const initialState = {
  isLoading: false,
  error: false,
  message: '',
  task: undefined,
  showModal: false,
  list: []
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_TASK_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...',
        showModal: false
      };
    case GET_SINGLE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: {
          employeeId: action.payload.data.employeeId,
          projectId: action.payload.data.projectId,
          title: action.payload.data.title,
          description: action.payload.data.description,
          date: action.payload.data.date,
          done: action.payload.data.done
        },
        message: action.payload.message
      };
    case GET_SINGLE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case ADD_TASK_PENDING:
      return {
        ...state,
        message: 'Loading...',
        showModal: false
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: action.payload.data,
        message: action.payload.message
      };
    case ADD_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case EDIT_TASK_PENDING:
      return {
        ...state,
        message: 'Loading...',
        showModal: false
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: action.payload.data,
        message: action.payload.message
      };
    case EDIT_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true,
        showModal: false
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        showModal: true
      };
    case DELETE_TASK_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Deleting...',
        showModal: false
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: 'Task deleted Successfully',
        list: state.list.filter((task) => task._id !== action.payload),
        showModal: true,
        error: false
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        showModal: true,
        error: true
      };
    case SET_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    case RESET_TASK:
      return {
        ...state,
        task: undefined
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
