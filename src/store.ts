import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import jobReducer from "./reducers/jobReducer";
import userReducer from "./reducers/userReducer";
import reviewsReducer from "./reducers/reviewsReducer";
import favoritesReducer from "./reducers/favoritesReducer";
import uiReducer from "./reducers/uiReducer";

export interface StoreState {
  init?: String;
}

const appReducer = combineReducers<StoreState>({
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

const composeEnhancers = composeWithDevTools({ trace: true });
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  // compose(
  //   applyMiddleware(thunk),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  // )
);
