import {
  Caregiver,
  Employer,
  SetLoginStatusAction,
  StoreCaregiversAction,
  StoreEmployersAction,
  StoreUserDataAction,
} from "../actions/actions";
import { ActionTypes } from "../actions/types";

export interface UserState {
  signingUp: boolean;
  calendarView: boolean;
  showModal: boolean;
  userData: Caregiver | Employer | undefined;
  userType: string;
  caregivers: Caregiver[];
  employers: Employer[];
}

interface SetUserTypeAction {
  type: ActionTypes.setUserType;
  userType: string;
}

export interface LogoutAction {
  type: ActionTypes.logout;
  isLoggedIn: boolean;
}

interface SetSigningUpAction {
  type: ActionTypes.setSigningUp;
  signingUp: boolean;
}

interface SwitchViewAction {
  type: ActionTypes.switchView;
  calendarView: boolean;
}

interface ShowUserTypeModalAction {
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
  },
  action:
    | StoreUserDataAction
    | SetUserTypeAction
    | SetLoginStatusAction
    | LogoutAction
    | SetSigningUpAction
    | StoreCaregiversAction
    | StoreEmployersAction
    | SwitchViewAction
    | ShowUserTypeModalAction
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
