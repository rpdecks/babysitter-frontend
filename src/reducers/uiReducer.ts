import { Action, ActionTypes } from "../actions/types";

export interface UiState {
  loading: boolean;
}

export interface LoadingDataAction {
  type: ActionTypes.loadingData;
  loading: boolean;
}

export interface FinishLoadingDataAction {
  type: ActionTypes.finishLoading;
  loading: boolean;
}

export default function uiReducer(
  state: UiState = { loading: false },
  action: Action
) {
  switch (action.type) {
    case ActionTypes.loadingData:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.finishLoading:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
