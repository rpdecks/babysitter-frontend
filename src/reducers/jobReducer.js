export default function jobReducer(state = { jobs: []}, action) {
  switch (action.type) {
    case 'CREATE_NEW_JOB':
      return {
        ...state,
        userJobs: [...state.userJobs, action.newJob]
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