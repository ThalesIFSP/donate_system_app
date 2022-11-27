import {
  EDIT_SEND_NOTIFY_ERROR,
  EDIT_SEND_NOTIFY_SUCCESS,
  EDIT_USER_ERROR,
  EDIT_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from '../config/ActionConstant';

const initialState = {
  userData: null,
  registerSuccess: null,
  registerError: null,
  loginSuccess: null,
  loginError: null,
  editSendNotifySuccess: null,
  editSendNotifyError: null,
  editUserSuccess: null,
  editUserError: null,
  errorMessage: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        registerError: false,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registerSuccess: false,
        registerError: true,
        errorMessage: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        loginError: false,
        userData: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginSuccess: false,
        loginError: true,
        errorMessage: action.payload,
      };
    case EDIT_SEND_NOTIFY_SUCCESS:
      return {
        ...state,
        editSendNotifySuccess: true,
        editSendNotifyError: false,
      };
    case EDIT_SEND_NOTIFY_ERROR:
      return {
        ...state,
        editSendNotifySuccess: false,
        editSendNotifyError: true,
        errorMessage: action.payload,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserSuccess: true,
        editUserError: false,
      };
    case EDIT_USER_ERROR:
      return {
        ...state,
        editUserSuccess: true,
        editUserError: false,
      };
    default:
      return state;
  }
};

export default auth;
