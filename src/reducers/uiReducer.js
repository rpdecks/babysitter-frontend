export default function uiReducer(state = {hydrated: false, calendarView: true}, action) {
    switch (action.type) {
      case 'HYDRATE_COMPLETE':
        return {
          ...state,
          hydrated: true
      }
      default:
        return state;
    }
}