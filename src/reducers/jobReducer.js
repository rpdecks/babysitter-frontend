export default function jobReducer(state = { jobs: []}, action) {
  switch (action.type) {
    case 'CREATE_NEW_JOB':
      debugger
      return {
        ...state,
        jobs: [...state.jobs, action.newJob]
      }
    default:
      return state;
  }
}