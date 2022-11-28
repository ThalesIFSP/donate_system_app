import {
  ACCEPT_SOLICITATION_ERROR,
  ACCEPT_SOLICITATION_SUCCESS,
  CANCEL_MOD_SOLICITATION_ERROR,
  CANCEL_MOD_SOLICITATION_SUCCESS,
  CANCEL_SOLICITATION_ERROR,
  CANCEL_SOLICITATION_SUCCESS,
  CREATE_SOLICITATION_ERROR,
  CREATE_SOLICITATION_SUCCESS,
  DONE_SOLICITATION_ERROR,
  DONE_SOLICITATION_SUCCESS,
  GET_DONATION_NUMBER_ERROR,
  GET_DONATION_NUMBER_SUCCESS,
  GET_MODERATOR_ERROR,
  GET_MODERATOR_SUCCESS,
  GET_SOLICITATIONS_USER_ERROR,
  GET_SOLICITATIONS_USER_SUCCESS,
  GET_SOLICITATION_DETAIL_ERROR,
  GET_SOLICITATION_DETAIL_SUCCESS,
  PENDING_SOLICITATION_ERROR,
  PENDING_SOLICITATION_SUCCESS,
  REFUSE_SOLICITATION_ERROR,
  REFUSE_SOLICITATION_SUCCESS,
  SOLICITATION_HISTORY_ERROR,
  SOLICITATION_HISTORY_SUCCESS,
  WAITING_SOLICITATION_ERROR,
  WAITING_SOLICITATION_SUCCESS,
} from '../config/ActionConstant';

const initialState = {
  solicitationData: null,
  moderatorData: null,
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
  pendingSolicitationSuccess: null,
  pendingSolicitationError: null,
  waitingSolicitationSuccess: null,
  waitingSolicitationError: null,
  acceptSolicitationSuccess: null,
  acceptSolicitationError: null,
  refuseSolicitationSuccess: null,
  refuseSolicitationError: null,
  doneSolicitationSuccess: null,
  doneSolicitationError: null,
  cancelModSolicitationSuccess: null,
  cancelModSolicitationError: null,
  getModeratorSuccess: null,
  getModeratorError: null,
  solicitationHistorySuccess: null,
  solicitationHistoryError: null,
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
        errorMessage: action.payload,
      };
    case ACCEPT_SOLICITATION_SUCCESS:
      return {
        ...state,
        acceptSolicitationSuccess: true,
        acceptSolicitationError: false,
      };
    case ACCEPT_SOLICITATION_ERROR:
      return {
        ...state,
        acceptSolicitationSuccess: false,
        acceptSolicitationError: true,
        errorMessage: action.payload,
      };
    case REFUSE_SOLICITATION_SUCCESS:
      return {
        ...state,
        refuseSolicitationSuccess: true,
        refuseSolicitationError: false,
      };
    case REFUSE_SOLICITATION_ERROR:
      return {
        ...state,
        refuseSolicitationSuccess: false,
        refuseSolicitationError: true,
        errorMessage: action.payload,
      };
    case DONE_SOLICITATION_SUCCESS:
      return {
        ...state,
        doneSolicitationSuccess: true,
        doneSolicitationError: false,
      };
    case DONE_SOLICITATION_ERROR:
      return {
        ...state,
        doneSolicitationSuccess: false,
        doneSolicitationError: true,
        errorMessage: action.payload,
      };
    case CANCEL_MOD_SOLICITATION_SUCCESS:
      return {
        ...state,
        cancelModSolicitationSuccess: true,
        cancelModSolicitationError: false,
      };
    case CANCEL_MOD_SOLICITATION_ERROR:
      return {
        ...state,
        cancelModSolicitationSuccess: false,
        cancelModSolicitationError: true,
        errorMessage: action.payload,
      };
    case PENDING_SOLICITATION_SUCCESS:
      return {
        ...state,
        pendingSolicitationSuccess: true,
        pendingSolicitationError: false,
        solicitationData: action.payload,
      };
    case PENDING_SOLICITATION_ERROR:
      return {
        ...state,
        pendingSolicitationSuccess: false,
        pendingSolicitationError: true,
        errorMessage: action.payload,
      };
    case GET_MODERATOR_SUCCESS:
      return {
        ...state,
        getModeratorSuccess: true,
        getModeratorError: false,
        moderatorData: action.payload,
      };
    case GET_MODERATOR_ERROR:
      return {
        ...state,
        getModeratorSuccess: false,
        getModeratorError: true,
        errorMessage: action.payload,
      };
    case WAITING_SOLICITATION_SUCCESS:
      return {
        ...state,
        waitingSolicitationSuccess: true,
        waitingSolicitationError: false,
        solicitationData: action.payload,
      };
    case WAITING_SOLICITATION_ERROR:
      return {
        ...state,
        waitingSolicitationSuccess: false,
        waitingSolicitationError: true,
        errorMessage: action.payload,
      };
    case SOLICITATION_HISTORY_SUCCESS:
      return {
        ...state,
        solicitationHistorySuccess: true,
        solicitationHistoryError: false,
        solicitationData: action.payload,
      };
    case SOLICITATION_HISTORY_ERROR:
      return {
        ...state,
        solicitationHistorySuccess: false,
        solicitationHistoryError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default solicitation;
