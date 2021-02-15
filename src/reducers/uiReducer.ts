import { ActionTypes } from "../actions/types";

export interface UiState {
  loading: boolean;
}

interface LoadingDataAction {
  type: ActionTypes.loadingData;
  loading: boolean;
}

interface FinishLoadingDataAction {
  type: ActionTypes.finishLoading;
  loading: boolean;
}

export default function uiReducer(
  state: UiState = { loading: false },
  action: LoadingDataAction | FinishLoadingDataAction
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
