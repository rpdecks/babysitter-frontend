import {
  Job,
  StoreAvailableJobsAction,
  StoreInterestedJobsAction,
  StoreUserJobsAction,
} from "../actions/actions";
import { ActionTypes } from "../actions/types";

interface JobsState {
  jobs: Job[] | [];
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
  completionFilter: boolean;
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
  userJobs: Job[];
}

interface EditJobAction {
  type: ActionTypes.editJob;
  userJobs: Job[];
}

interface DeleteJobAction {
  type: ActionTypes.deleteJob;
  userJobs: Job[];
}

interface AddCandidateAction {
  type: ActionTypes.addCandidate;
  interestedJobs: Job[];
}

interface RemoveCandidateAction {
  type: ActionTypes.removeCandidate;
  interestedJobs: Job[];
}

export default function jobReducer(
  state: JobsState = {
    jobs: [],
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
        userJobs: [...state.userJobs, action.newJob],
      };
    case ActionTypes.editJob:
      let jobsCopy = [
        ...state.userJobs.filter((job: Job) => job.id !== action.editedJob.id),
      ];
      return {
        ...state,
        userJobs: [...jobsCopy, action.editedJob],
      };
    case ActionTypes.deleteJob:
      return {
        ...state,
        userJobs: [
          ...state.userJobs.filter((job) => job.id !== action.deleteJob),
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
        interestedJobs: [...state.interestedJobs, { job_id: action.job_id }],
      };
    case ActionTypes.removeCandidate:
      return {
        ...state,
        interestedJobs: [
          ...state.interestedJobs.filter((job) => job.job_id !== action.job_id),
        ],
      };
    default:
      return state;
  }
}
