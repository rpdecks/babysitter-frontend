export default function jobReducer(state = {
                                  jobs: [], 
                                  completionFilter: null, 
                                  nonSmokingFilter: false, 
                                  firstAidCertFilter: false, 
                                  petsFilter: false, 
                                  selectedJob: {},
                                  sortBy: 'start_time', 
                                  ascending: true, 
                                  }, action) {
  switch (action.type) {
    case 'SET_SELECTED_JOB':
      return {
        ...state,
        selectedJob: action.selectedJob
      }
    case 'SWITCH_ORDER':
      return {
        ...state,
        ascending: action.ascending
      }
    case 'SORT_BY': 
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'FILTER_BY_COMPLETED':
      return {
        ...state,
        completionFilter: action.completionFilter
      }
    case 'FILTER_BY_NON_SMOKING':
      return {
        ...state,
        nonSmokingFilter: action.nonSmokingFilter
      }
    case 'FILTER_BY_FIRST_AID':
      return {
        ...state,
        firstAidCertFilter: action.firstAidCertFilter
      }
    case 'FILTER_BY_PETS':
      return {
        ...state,
        petsFilter: action.petsFilter
      }
    case 'CREATE_NEW_JOB':
      return {
        ...state,
        userJobs: [...state.userJobs, action.newJob]
      }
    case 'EDIT_JOB':
      let jobsCopy = [...state.userJobs.filter(job => job.id !== action.editedJob.id)]
      return {
        ...state,
        userJobs: [...jobsCopy, action.editedJob]
      }
    case 'DELETE_JOB':
      return {
        ...state,
        userJobs: [...state.userJobs.filter(job => job.id !== action.deleteJob)]
      }
    case 'STORE_USER_JOBS':
      return {
        ...state,
        userJobs: action.userJobs
      }
    case 'STORE_AVAILABLE_JOBS':
      return {
        ...state,
        availableJobs: action.availableJobs
      }
    case 'STORE_INTERESTED_JOBS':
      return {
        ...state,
        interestedJobs: action.interestedJobs
      }
    case 'ADD_CANDIDATE':
        return {
          ...state,
          interestedJobs: [...state.interestedJobs, {job_id: action.job_id}]
        }
    case 'REMOVE_CANDIDATE':
      return {
        ...state,
        interestedJobs: [...state.interestedJobs.filter(job => job.job_id !== action.job_id)]
      }
    default:
      return state;
  }
}