import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import jobReducer from "./reducers/jobReducer";
import userReducer from "./reducers/userReducer";
import reviewsReducer from "./reducers/reviewsReducer";
import favoritesReducer from "./reducers/favoritesReducer";
import uiReducer from "./reducers/uiReducer";
import { JobsState } from "./reducers/jobReducer";

export interface StoreState {
  jobsState: JobsState;
}

const appReducer = combineReducers({
  uiReducer,
  userReducer,
  jobReducer,
  favoritesReducer,
  reviewsReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "USER_LOGGED_OUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);
