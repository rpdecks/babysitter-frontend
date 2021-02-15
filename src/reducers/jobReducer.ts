import {
  Job,
  StoreAvailableJobsAction,
  StoreInterestedJobsAction,
  StoreUserJobsAction,
} from "../actions/actions";
import { ActionTypes } from "../actions/types";

export interface JobsState {
  userJobs: Job[] | [];
  interestedJobs: Job[] | [];
  availableJobs: Job[] | [];
  completionFilter: string | null;
  nonSmokingFilter: boolean;
  firstAidCertFilter: boolean;
  petsFilter: boolean;
  selectedJob: Job | {};
  sortBy: string;
  ascending: boolean;
}

interface SetSelectedJobAction {
  type: ActionTypes.setSelectedJob;
  selectedJob: Job;
}

interface SwitchJobOrderAction {
  type: ActionTypes.switchOrder;
  ascending: boolean;
}

interface SortJobsByAction {
  type: ActionTypes.sortBy;
  sortBy: string;
}

interface FilterByCompletedJobsAction {
  type: ActionTypes.filterByCompleted;
  completionFilter: string;
}

interface FilterByNonSmokingJobsAction {
  type: ActionTypes.filterByNonSmoking;
  nonSmokingFilter: boolean;
}

interface FilterByFirstAidJobsAction {
  type: ActionTypes.filterByFirstAid;
  firstAidCertFilter: boolean;
}

interface FilterByPetsJobsAction {
  type: ActionTypes.filterByPets;
  petsFilter: boolean;
}

interface CreateNewJobAction {
  type: ActionTypes.createNewJob;
  payload: Job;
}

interface EditJobAction {
  type: ActionTypes.editJob;
  payload: Job;
}

interface DeleteJobAction {
  type: ActionTypes.deleteJob;
  payload: number;
}

interface AddCandidateAction {
  type: ActionTypes.addCandidate;
  payload: number;
}

interface RemoveCandidateAction {
  type: ActionTypes.removeCandidate;
  payload: number;
}

export default function jobReducer(
  state: JobsState = {
    userJobs: [],
    interestedJobs: [],
    availableJobs: [],
    completionFilter: null,
    nonSmokingFilter: false,
    firstAidCertFilter: false,
    petsFilter: false,
    selectedJob: {},
    sortBy: "start_time",
    ascending: true,
  },
  action:
    | StoreAvailableJobsAction
    | StoreInterestedJobsAction
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
    | StoreUserJobsAction
    | AddCandidateAction
    | RemoveCandidateAction
) {
  switch (action.type) {
    case ActionTypes.setSelectedJob:
      return {
        ...state,
        selectedJob: action.selectedJob,
      };
    case ActionTypes.switchOrder:
      return {
        ...state,
        ascending: action.ascending,
      };
    case ActionTypes.sortBy:
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case ActionTypes.filterByCompleted:
      return {
        ...state,
        completionFilter: action.completionFilter,
      };
    case ActionTypes.filterByNonSmoking:
      return {
        ...state,
        nonSmokingFilter: action.nonSmokingFilter,
      };
    case ActionTypes.filterByFirstAid:
      return {
        ...state,
        firstAidCertFilter: action.firstAidCertFilter,
      };
    case ActionTypes.filterByPets:
      return {
        ...state,
        petsFilter: action.petsFilter,
      };
    case ActionTypes.createNewJob:
      return {
        ...state,
        userJobs: [...state.userJobs, action.payload],
      };
    case ActionTypes.editJob:
      let jobsCopy = [
        ...state.userJobs.filter((job: Job) => job.id !== action.payload.id),
      ];
      return {
        ...state,
        userJobs: [...jobsCopy, action.payload],
      };
    case ActionTypes.deleteJob:
      return {
        ...state,
        userJobs: [
          ...state.userJobs.filter((job) => job.id !== action.payload),
        ],
      };
    case ActionTypes.storeUserJobs:
      return {
        ...state,
        userJobs: action.userJobs,
      };
    case ActionTypes.storeAvailableJobs:
      return {
        ...state,
        availableJobs: action.availableJobs,
      };
    case ActionTypes.storeInterestedJobs:
      return {
        ...state,
        interestedJobs: action.interestedJobs,
      };
    case ActionTypes.addCandidate:
      return {
        ...state,
        interestedJobs: [...state.interestedJobs, { job_id: action.payload }],
      };
    case ActionTypes.removeCandidate:
      return {
        ...state,
        interestedJobs: [
          ...state.interestedJobs.filter((job) => job.id !== action.payload),
        ],
      };
    default:
      return state;
  }
}
