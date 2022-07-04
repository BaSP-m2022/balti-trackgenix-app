import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { employeeReducer } from './employees/reducer';
import { adminsReducer } from './admins/reducer';
import { timesheetReducer } from './timesheets/reducer';
import { superAdminsReducer } from './SuperAdmins/reducer';
import { projectsReducer } from './projects/reducer';
import { tasksReducer } from './tasks/reducer';
import { authReducer } from './auth/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
  timesheet: timesheetReducer,
  superAdmins: superAdminsReducer,
  employees: employeeReducer,
  auth: authReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
