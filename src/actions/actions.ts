import { API_ROOT } from "../services/apiRoot";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

interface Caregiver {
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

interface Employer {
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

interface Job {
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

interface Review {
  title: string;
  rating: number;
  content: string;
  caregiver_id: number;
  employer_id: number;
}

interface Favorite {
  caregiver_id: number;
  employer_id: number;
}

interface StoreUserDataAction {
  type: ActionTypes.storeUserData;
  userData: Employer | Caregiver;
}

interface StoreUserJobsAction {
  type: ActionTypes.storeUserJobs;
  userJobs: Job[];
}

interface StoreUserFavoritesAction {
  type: ActionTypes.storeUserFavorites;
  userFavorites: Favorite[];
}

interface StoreReviewsAction {
  type: ActionTypes.storeReviews;
  authoredReviews: Review[];
}

interface StoreReviewsAboutMeAction {
  type: ActionTypes.storeReviewsAboutMe;
  reviewsAboutMe: Review[];
}

interface StoreCaregiversAction {
  type: ActionTypes.storeCaregivers;
  caregivers: Caregiver[];
}

interface StoreEmployersAction {
  type: ActionTypes.storeEmployers;
  employers: Employer[];
}

interface StoreAvailableJobsAction {
  type: ActionTypes.storeAvailableJobs;
  availableJobs: Job[];
}

interface StoreInterestedJobsAction {
  type: ActionTypes.storeInterestedJobs;
  interestedJobs: Job[];
}

interface LoadingDataAction {
  type: ActionTypes.loadingData;
}

interface FinishLoadingAction {
  type: ActionTypes.finishLoading;
}

interface SetLoginStatusAction {
  type: ActionTypes.setLoginStatus;
  isLoggedIn: boolean;
}

export const fetchData = (userType: string) => {
  const auth_token = localStorage.getItem("auth_token");
  const fetchObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": auth_token,
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

export const editUserFetch = (id, userType, userObj) => {
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

export const signupFetch = (userObj, userType) => {
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
      .then((res) => dispatch(fetchData(userType)))
      .catch((errors) => alert(errors));
  };
};

export const loginFetch = (userType, userObj) => {
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
