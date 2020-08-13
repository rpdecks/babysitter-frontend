export default function uiReducer(state = { loading: false, hydrated: false, calendarView: true }, action) {
    switch (action.type) {
      case 'LOADING_DATA':
        return {
          ...state,
          loading: true
        }
      case 'FINISH_LOADING':
        return {
          ...state,
          loading: false
        }
      case 'HYDRATE_COMPLETE':
        return {
          ...state,
          hydrated: true
      }
      default:
        return state;
    }
}