export default function uiReducer(state = { loading: false, calendarView: true }, action) {
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
      default:
        return state;
    }
}