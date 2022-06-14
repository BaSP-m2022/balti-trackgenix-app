import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { tasksReducer } from './Task/reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return legacy_createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
