import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import jobReducer from "./reducers/jobReducer";
import userReducer from "./reducers/userReducer";
import reviewsReducer, { ReviewsState } from "./reducers/reviewsReducer";
import favoritesReducer from "./reducers/favoritesReducer";
import uiReducer from "./reducers/uiReducer";
import { JobsState } from "./reducers/jobReducer";
import { UserState } from "./reducers/userReducer";
import { UiState } from "./reducers/uiReducer";
import { FavoritesState } from "./reducers/favoritesReducer";
import { LogoutAction } from "./reducers/userReducer";
import { ActionTypes } from "./actions/types";

export interface StoreState {
  ui: UiState;
  users: UserState;
  jobs: JobsState;
  favorites: FavoritesState;
  reviews: ReviewsState;
}

const appReducer = combineReducers<StoreState>({
  ui: uiReducer,
  users: userReducer,
  jobs: jobReducer,
  favorites: favoritesReducer,
  reviews: reviewsReducer,
});

const rootReducer = (state: any, action: LogoutAction) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === ActionTypes.logout) {
    state = undefined;
  }
  return appReducer(state, action);
};

const composeEnhancers = composeWithDevTools({ trace: true });
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
