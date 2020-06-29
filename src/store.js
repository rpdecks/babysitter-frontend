import { combineReducers, createStore } from 'redux';
import jobReducer from './reducers/jobReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
  jobReducer: jobReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);