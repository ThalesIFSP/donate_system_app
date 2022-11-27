import {
  GET_ALL_CHARITIES_SUCCESS,
  GET_ALL_CHARITIES_ERROR,
  GET_CHARITY_NUMBER_SUCCESS,
  GET_CHARITY_NUMBER_ERROR,
} from '../config/ActionConstant';

const initialState = {
  charityData: null,
  getAllSuccess: null,
  getAllError: null,
  numberCharity: null,
  getNumberSuccess: null,
  getNumberError: null,
  errorMessage: null,
};

const charity = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHARITIES_SUCCESS:
      return {
        ...state,
        getAllSuccess: true,
        getAllError: false,
        charityData: action.payload,
      };
    case GET_ALL_CHARITIES_ERROR:
      return {
        ...state,
        getAllSuccess: false,
        getAllError: true,
        errorMessage: action.payload,
      };
    case GET_CHARITY_NUMBER_SUCCESS:
      return {
        ...state,
        getNumberError: false,
        getNumberSuccess: true,
        numberCharity: action.payload,
      };
    case GET_CHARITY_NUMBER_ERROR:
      return {
        ...state,
        getNumberError: true,
        getNumberSuccess: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default charity;
