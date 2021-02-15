import { API_ROOT } from "../services/apiRoot";
import { Dispatch } from "redux";
import {
  ActionTypes,
  Caregiver,
  Employer,
  StoreUserDataAction,
  LoadingDataAction,
  FinishLoadingAction,
} from ".";

export const editUserFetch = (
  id: number,
  userType: string,
  userObj: Caregiver | Employer
) => {
  const fetchObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  };

  return (dispatch: Dispatch) => {
    dispatch<LoadingDataAction>({ type: ActionTypes.loadingData });
    fetch(`${API_ROOT}/${userType}s/${id}`, fetchObj)
      .then((res) => res.json())
      .then((userData) => {
        if (userData.id) {
          dispatch<StoreUserDataAction>({
            type: ActionTypes.storeUserData,
            userData: userData,
          });
        } else {
          alert(userData.msg);
        }
        dispatch<FinishLoadingAction>({ type: ActionTypes.finishLoading });
      })
      .catch((errors) => console.log(errors));
  };
};
