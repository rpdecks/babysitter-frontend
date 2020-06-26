import { combineReducers, createStore } from 'redux';
import sitterReducer from './reducers/sitterReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  sitterReducer: sitterReducer,
  userReducer: userReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);