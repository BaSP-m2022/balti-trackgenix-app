import {
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_SUCCESS,
  ADD_TIMESHEET_ERROR,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_ERROR,
  GET_SINGLE_TIMESHEET_PENDING,
  GET_SINGLE_TIMESHEET_SUCCESS,
  GET_SINGLE_TIMESHEET_ERROR,
  RESET_TIMESHEET,
  FILL_TIMESHEET,
  RESET_MESSAGE
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  message: '',
  timesheet: undefined
};

export const timesheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case GET_SINGLE_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        timesheet: {
          employee: action.payload.data.employee,
          project: action.payload.data.project,
          task: action.payload.data.task,
          date: action.payload.data.date,
          role: action.payload.data.role,
          rate: action.payload.data.rate,
          workedHours: action.payload.data.workedHours,
          description: action.payload.data.description
        },
        message: action.payload.message
      };
    case GET_SINGLE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case ADD_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case ADD_TIMESHEET_SUCCESS:
      return {
        ...state,
        // list: [...state.list, action.payload.data],
        isLoading: false,
        error: false,
        message: action.payload.message,
        timesheet: action.payload.data
      };
    case ADD_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case EDIT_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case EDIT_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload.message,
        timesheet: action.payload.data
      };
    case EDIT_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case RESET_TIMESHEET:
      return {
        ...state,
        timesheet: undefined
      };
    case FILL_TIMESHEET:
      return {
        ...state,
        timesheet: { ...state.timesheet, ...action.payload }
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
