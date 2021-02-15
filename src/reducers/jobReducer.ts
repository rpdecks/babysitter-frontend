import {
  Job,
  StoreAvailableJobsAction,
  StoreInterestedJobsAction,
  StoreUserJobsAction,
} from "../actions";
import { Action, ActionTypes } from "../actions/types";

export interface JobsState {
  userJobs: Job[] | [];
  interestedJobs: InterestedJob[] | [];
  availableJobs: Job[] | [];
  completionFilter: string | null;
  nonSmokingFilter: boolean;
  firstAidCertFilter: boolean;
  petsFilter: boolean;
  selectedJob: Job | {};
  sortBy: string;
  ascending: boolean;
}

export interface InterestedJob {
  job_id: number;
}

export interface SetSelectedJobAction {
  type: ActionTypes.setSelectedJob;
  selectedJob: Job;
}

export interface SwitchJobOrderAction {
  type: ActionTypes.switchOrder;
  ascending: boolean;
}

export interface SortJobsByAction {
  type: ActionTypes.sortBy;
  sortBy: string;
}

export interface FilterByCompletedJobsAction {
  type: ActionTypes.filterByCompleted;
  completionFilter: string;
}

export interface FilterByNonSmokingJobsAction {
  type: ActionTypes.filterByNonSmoking;
  nonSmokingFilter: boolean;
}

export interface FilterByFirstAidJobsAction {
  type: ActionTypes.filterByFirstAid;
  firstAidCertFilter: boolean;
}

export interface FilterByPetsJobsAction {
  type: ActionTypes.filterByPets;
  petsFilter: boolean;
}

export interface CreateNewJobAction {
  type: ActionTypes.createNewJob;
  payload: Job;
}

export interface EditJobAction {
  type: ActionTypes.editJob;
  payload: Job;
}

export interface DeleteJobAction {
  type: ActionTypes.deleteJob;
  payload: number;
}

export interface AddCandidateAction {
  type: ActionTypes.addCandidate;
  payload: number;
}

export interface RemoveCandidateAction {
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
  action: Action
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
          ...state.interestedJobs.filter(
            (job) => job.job_id !== action.payload
          ),
        ],
      };
    default:
      return state;
  }
}
