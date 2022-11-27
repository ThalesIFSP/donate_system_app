import {
  CANCEL_SOLICITATION_ERROR,
  CANCEL_SOLICITATION_SUCCESS,
  CREATE_SOLICITATION_ERROR,
  CREATE_SOLICITATION_SUCCESS,
  GET_DONATION_NUMBER_ERROR,
  GET_DONATION_NUMBER_SUCCESS,
  GET_SOLICITATIONS_USER_ERROR,
  GET_SOLICITATIONS_USER_SUCCESS,
  GET_SOLICITATION_DETAIL_ERROR,
  GET_SOLICITATION_DETAIL_SUCCESS,
} from '../config/ActionConstant';

const initialState = {
  solicitationData: null,
  createSolicitationSuccess: null,
  createSolicitationError: null,
  numberSolicitation: null,
  getDonationNumberSuccess: null,
  getDonationNumberError: null,
  getSolicitationUserSucess: null,
  getSolicitationUserError: null,
  solicitationDetail: null,
  getSolicitationDetailSuccess: null,
  getSolicitationDetailError: null,
  cancelSolicitationSuccess: null,
  cancelSolicitationError: null,
  errorMessage: null,
};

const solicitation = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SOLICITATION_SUCCESS:
      return {
        ...state,
        createSolicitationSuccess: true,
        createSolicitationError: false,
        solicitationData: action.payload,
      };
    case CREATE_SOLICITATION_ERROR:
      return {
        ...state,
        createSolicitationSuccess: false,
        createSolicitationError: true,
        errorMessage: action.payload,
      };
    case GET_DONATION_NUMBER_SUCCESS:
      return {
        ...state,
        getDonationNumberSuccess: true,
        getDonationNumberError: false,
        numberSolicitation: action.payload,
      };
    case GET_DONATION_NUMBER_ERROR:
      return {
        ...state,
        getDonationNumberSuccess: false,
        getDonationNumberError: true,
        errorMessage: action.payload,
      };
    case GET_SOLICITATIONS_USER_SUCCESS:
      return {
        ...state,
        getSolicitationUserSucess: true,
        getSolicitationUserError: false,
        solicitationData: action.payload,
      };
    case GET_SOLICITATIONS_USER_ERROR:
      return {
        ...state,
        getSolicitationUserSucess: false,
        getSolicitationUserError: true,
        errorMessage: action.payload,
      };
    case GET_SOLICITATION_DETAIL_SUCCESS:
      return {
        ...state,
        getSolicitationDetailSuccess: true,
        getSolicitationDetailError: false,
        solicitationDetail: action.payload,
      };
    case GET_SOLICITATION_DETAIL_ERROR:
      return {
        ...state,
        getSolicitationDetailSuccess: false,
        getSolicitationDetailError: true,
        errorMessage: action.payload,
      };
    case CANCEL_SOLICITATION_SUCCESS:
      return {
        ...state,
        cancelSolicitationSuccess: true,
        cancelSolicitationError: false,
      };
    case CANCEL_SOLICITATION_ERROR:
      return {
        ...state,
        cancelSolicitationSuccess: false,
        cancelSolicitationError: true,
      };
    default:
      return state;
  }
};

export default solicitation;
