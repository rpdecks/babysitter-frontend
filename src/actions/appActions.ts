import { API_ROOT } from "../services/apiRoot";
import { Dispatch } from "redux";
import { ActionTypes } from ".";
import { InterestedJob } from "../reducers/jobReducer";

export interface Caregiver {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  dob: Date;
  gender: string;
  phone: string;
  smoker: boolean;
  bio: string;
  has_pets: boolean;
  pay_rate: number;
  first_aid_cert: boolean;
  image: string;
  status: string;
}

export interface Employer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  dob: Date;
  gender: string;
  phone: string;
  smoker: boolean;
  bio: string;
  has_pets: boolean;
  pay_rate: number;
  first_aid_cert: boolean;
  image: string;
  status: string;
}

export interface Job {
  id: number;
  employer_id: number;
  caregiver_id: number;
  title: string;
  desc: string;
  status: string;
  pay_rate: number;
  total_child_count: number;
  infant_count: number;
  toddler_count: number;
  school_age_count: number;
  completed: boolean;
  non_smoking: boolean;
  first_aid_cert: boolean;
  has_pets: boolean;
}

export interface Review {
  id: number;
  employer_id: number;
  caregiver_id: number;
  title: string;
  content: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

export interface Favorite {
  id: number;
  employer_id: number;
  caregiver_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface StoreUserDataAction {
  type: ActionTypes.storeUserData;
  userData: Employer | Caregiver;
}

export interface StoreUserJobsAction {
  type: ActionTypes.storeUserJobs;
  userJobs: Job[];
}

export interface StoreUserFavoritesAction {
  type: ActionTypes.storeUserFavorites;
  userFavorites: Favorite[];
}

export interface StoreReviewsAction {
  type: ActionTypes.storeReviews;
  authoredReviews: Review[];
}

export interface StoreReviewsAboutMeAction {
  type: ActionTypes.storeReviewsAboutMe;
  reviewsAboutMe: Review[];
}

export interface StoreCaregiversAction {
  type: ActionTypes.storeCaregivers;
  caregivers: Caregiver[];
}

export interface StoreEmployersAction {
  type: ActionTypes.storeEmployers;
  employers: Employer[];
}

export interface StoreAvailableJobsAction {
  type: ActionTypes.storeAvailableJobs;
  availableJobs: Job[];
}

export interface StoreInterestedJobsAction {
  type: ActionTypes.storeInterestedJobs;
  interestedJobs: InterestedJob[];
}

export interface LoadingDataAction {
  type: ActionTypes.loadingData;
}

export interface FinishLoadingAction {
  type: ActionTypes.finishLoading;
}

export interface SetLoginStatusAction {
  type: ActionTypes.setLoginStatus;
  isLoggedIn: boolean;
}

export const fetchData = (userType: string) => {
  const auth_token = localStorage.getItem("auth_token");
  const fetchObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": `${auth_token}`,
    },
  };

  return (dispatch: Dispatch) => {
    dispatch<LoadingDataAction>({ type: ActionTypes.loadingData });
    fetch(`${API_ROOT}/app_status`, fetchObject)
      .then((res) => res.json())
      .then((appData) => {
        dispatch<StoreUserJobsAction>({
          type: ActionTypes.storeUserJobs,
          userJobs: appData.jobs,
        });
        dispatch<StoreUserDataAction>({
          type: ActionTypes.storeUserData,
          userData: appData.user,
        });
        if (userType === "employer") {
          dispatch<StoreUserFavoritesAction>({
            type: ActionTypes.storeUserFavorites,
            userFavorites: appData.employer_favorites,
          });
          dispatch<StoreReviewsAction>({
            type: ActionTypes.storeReviews,
            authoredReviews: appData.employer_reviews,
          });
          dispatch<StoreReviewsAboutMeAction>({
            type: ActionTypes.storeReviewsAboutMe,
            reviewsAboutMe: appData.caregiver_reviews,
          });
          dispatch<StoreCaregiversAction>({
            type: ActionTypes.storeCaregivers,
            caregivers: appData.caregivers,
          });
        } else if (userType === "caregiver") {
          dispatch<StoreUserFavoritesAction>({
            type: ActionTypes.storeUserFavorites,
            userFavorites: appData.caregiver_favorites,
          });
          dispatch<StoreReviewsAction>({
            type: ActionTypes.storeReviews,
            authoredReviews: appData.employer_reviews,
          });
          dispatch<StoreReviewsAboutMeAction>({
            type: ActionTypes.storeReviewsAboutMe,
            reviewsAboutMe: appData.caregiver_reviews,
          });
          dispatch<StoreEmployersAction>({
            type: ActionTypes.storeEmployers,
            employers: appData.employers,
          });
          dispatch<StoreAvailableJobsAction>({
            type: ActionTypes.storeAvailableJobs,
            availableJobs: appData.available_jobs,
          });
          dispatch<StoreInterestedJobsAction>({
            type: ActionTypes.storeInterestedJobs,
            interestedJobs: appData.interested_jobs,
          });
        }
        dispatch({ type: "FINISH_LOADING" });
      })
      .catch((errors) => console.log(errors));
  };
};

export const signupFetch = (
  userObj: Caregiver | Employer,
  userType: string
) => {
  const fetchObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  };

  return (dispatch: Dispatch) => {
    dispatch<LoadingDataAction>({ type: ActionTypes.loadingData });
    fetch(`${API_ROOT}/${userType}s`, fetchObj)
      .then((res) => res.json())
      .then((loginData) => {
        if (loginData.token) {
          localStorage.setItem("auth_token", loginData.token);
          localStorage.setItem("userType", userType);
          dispatch<SetLoginStatusAction>({
            type: ActionTypes.setLoginStatus,
            isLoggedIn: true,
          });
        } else {
          alert(loginData.msg);
        }
      })
      .then(() => fetchData(userType)) // used to be dispatch(fetchData(userType))
      .catch((errors) => alert(errors));
  };
};

export const loginFetch = (userType: string, userObj: Caregiver | Employer) => {
  const fetchObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  };

  return (dispatch: Dispatch) => {
    dispatch({ type: "LOADING_DATA" });
    if (userType === "employer") {
      fetch(`${API_ROOT}/employers/login`, fetchObj)
        .then((res) => res.json())
        .then((loginData) => {
          if (loginData.token) {
            localStorage.setItem("auth_token", loginData.token);
            localStorage.setItem("userType", userType);
            dispatch({ type: "SET_LOGIN_STATUS", isLoggedIn: true });
          } else alert(loginData.message);
        })
        .catch((errors) => alert(errors));
    } else if (userType === "caregiver") {
      fetch(`${API_ROOT}/caregivers/login`, fetchObj)
        .then((res) => res.json())
        .then((loginData) => {
          if (loginData.token) {
            localStorage.setItem("auth_token", loginData.token);
            localStorage.setItem("userType", userType);
            dispatch({ type: "SET_LOGIN_STATUS", isLoggedIn: true });
          } else alert(loginData.message);
          dispatch({ type: "FINISH_LOADING" });
        })
        .catch((errors) => alert(errors));
    }
  };
};
