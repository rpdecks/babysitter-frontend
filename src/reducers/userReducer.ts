import { Action, ActionTypes, Caregiver, Employer } from "../actions";

export interface UserState {
  signingUp: boolean;
  calendarView: boolean;
  showModal: boolean;
  userData: Caregiver | Employer | undefined;
  userType: string;
  caregivers: Caregiver[];
  employers: Employer[];
  isLoggedIn: boolean;
}

export interface SetUserTypeAction {
  type: ActionTypes.setUserType;
  userType: string;
}

export interface LogoutAction {
  type: ActionTypes.logout;
  isLoggedIn: boolean;
}

export interface SetSigningUpAction {
  type: ActionTypes.setSigningUp;
  signingUp: boolean;
}

export interface SwitchViewAction {
  type: ActionTypes.switchView;
  calendarView: boolean;
}

export interface ShowUserTypeModalAction {
  type: ActionTypes.showUserTypeModal;
  showModal: boolean;
}

export default function userReducer(
  state: UserState = {
    signingUp: false,
    calendarView: false,
    showModal: false,
    userData: undefined,
    userType: "",
    caregivers: [],
    employers: [],
    isLoggedIn: false,
  },
  action: Action
) {
  switch (action.type) {
    case ActionTypes.storeUserData:
      return {
        ...state,
        userData: action.userData,
      };
    case ActionTypes.setUserType:
      return { ...state, userType: action.userType };
    case ActionTypes.setLoginStatus:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case ActionTypes.logout:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case ActionTypes.setSigningUp:
      return { ...state, signingUp: true };
    case ActionTypes.storeCaregivers:
      return {
        ...state,
        caregivers: action.caregivers,
      };
    case ActionTypes.storeEmployers:
      return {
        ...state,
        employers: action.employers,
      };
    case ActionTypes.switchView:
      return {
        ...state,
        calendarView: action.calendarView,
      };
    case ActionTypes.showUserTypeModal:
      return {
        ...state,
        showModal: action.showModal,
      };
    default:
      return state;
  }
}
