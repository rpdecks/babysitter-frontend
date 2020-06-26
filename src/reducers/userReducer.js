export default function userReducer(state = {}, action) {
    switch (action.type) {
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
      default:
        return state;
    }
}