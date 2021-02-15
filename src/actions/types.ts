import {
  SetSelectedJobAction,
  SwitchJobOrderAction,
  SortJobsByAction,
  FilterByCompletedJobsAction,
  FilterByNonSmokingJobsAction,
  FilterByFirstAidJobsAction,
  FilterByPetsJobsAction,
  CreateNewJobAction,
  EditJobAction,
  DeleteJobAction,
  AddCandidateAction,
  RemoveCandidateAction,
  ShowUserTypeModalAction,
  SwitchViewAction,
  SetSigningUpAction,
  LogoutAction,
  SetUserTypeAction,
  AddFavoriteAction,
  DeleteFavoriteAction,
  FilterByFavoritesAction,
  AddReviewAction,
  DeleteReviewAction,
} from "../reducers";

import {
  StoreUserDataAction,
  StoreUserJobsAction,
  StoreUserFavoritesAction,
  StoreReviewsAction,
  StoreReviewsAboutMeAction,
  StoreCaregiversAction,
  StoreEmployersAction,
  StoreAvailableJobsAction,
  StoreInterestedJobsAction,
  LoadingDataAction,
  FinishLoadingAction,
  SetLoginStatusAction,
} from ".";

export enum ActionTypes {
  storeUserJobs,
  storeUserData,
  storeUserFavorites,
  storeReviews,
  storeReviewsAboutMe,
  storeCaregivers,
  storeEmployers,
  storeAvailableJobs,
  storeInterestedJobs,
  loadingData,
  finishLoading,
  setLoginStatus,
  logout,
  setSelectedJob,
  setSigningUp,
  setUserType,
  switchOrder,
  switchView,
  showUserTypeModal,
  sortBy,
  filterByCompleted,
  filterByPets,
  filterByNonSmoking,
  filterByFirstAid,
  createNewJob,
  editJob,
  deleteJob,
  addCandidate,
  removeCandidate,
  addReview,
  deleteReview,
  addFavorite,
  deleteFavorite,
  filterByFavorites,
}

export type Action =
  | SetSelectedJobAction
  | SwitchJobOrderAction
  | SortJobsByAction
  | FilterByCompletedJobsAction
  | FilterByNonSmokingJobsAction
  | FilterByFirstAidJobsAction
  | FilterByPetsJobsAction
  | CreateNewJobAction
  | EditJobAction
  | DeleteJobAction
  | AddCandidateAction
  | RemoveCandidateAction
  | StoreUserDataAction
  | StoreUserJobsAction
  | StoreUserFavoritesAction
  | StoreReviewsAction
  | StoreReviewsAboutMeAction
  | StoreCaregiversAction
  | StoreEmployersAction
  | StoreAvailableJobsAction
  | StoreInterestedJobsAction
  | LoadingDataAction
  | FinishLoadingAction
  | SetLoginStatusAction
  | AddFavoriteAction
  | DeleteFavoriteAction
  | FilterByFavoritesAction
  | AddReviewAction
  | DeleteReviewAction
  | ShowUserTypeModalAction
  | SwitchViewAction
  | SetSigningUpAction
  | LogoutAction
  | SetUserTypeAction;
