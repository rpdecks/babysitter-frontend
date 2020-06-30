export default function jobReducer(state = { jobs: []}, action) {
  switch (action.type) {
    case 'CREATE_NEW_JOB':
      return {
        ...state,
        jobs: [...state.jobs, action.newJob]
      }
    case 'STORE_JOBS':
      return {
        ...state,
        jobs: action.jobs
      }
    default:
      return state;
  }
}