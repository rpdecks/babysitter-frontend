export default function userReducer(state = { signingUp: false, calendarView: false }, action) {
    switch (action.type) {
      case 'SET_SELECTED_USER':
        return {
          ...state,
          selectedUser: action.selectedUser
        }
      case 'STORE_USER_DATA':
        return {
          ...state,
          user: action.user
        }
      case 'SET_USER_TYPE':
        return { ...state,
            userType: action.userType 
        }
      case 'SET_LOGIN_STATUS':
        return { ...state,
          isLoggedIn: action.isLoggedIn
        }
      case 'LOGOUT':
        return { ...state,
          isLoggedIn: action.isLoggedIn
        }
      case 'SETTING_SIGNING_UP':
        return { ...state,
          signingUp: true
        }
      case 'STORE_EMPLOYER_CAREGIVERS':
        return {
          ...state,
          employerCaregivers: action.employerCaregivers
        }
      case 'STORE_CAREGIVER_EMPLOYERS':
        return {
          ...state,
          caregiverEmployers: action.caregiverEmployers
        }
      case 'SWITCH_VIEW':
        return {
          ...state,
          calendarView: action.calendarView
        }
      default:
        return state;
    }
}