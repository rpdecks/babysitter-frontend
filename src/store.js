import { combineReducers, createStore } from 'redux';
import jobReducer from './reducers/jobReducer';
import userReducer from './reducers/userReducer';
import reviewsReducer from './reducers/reviewsReducer';
import favoritesReducer from './reducers/favoritesReducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
  jobReducer: jobReducer,
  favoritesReducer: favoritesReducer,
  reviewsReducer: reviewsReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);