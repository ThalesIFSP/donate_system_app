import {
  GET_ALL_CHARITIES_ERROR,
  GET_ALL_CHARITIES_SUCCESS,
  GET_CHARITY_NUMBER_ERROR,
  GET_CHARITY_NUMBER_SUCCESS,
} from '../config/ActionConstant';
import request from '../services';

export function getAllCharities() {
  return async dispatch => {
    try {
      const res = await request.charity.getAllCharities();
      const {data} = res;

      dispatch({
        type: GET_ALL_CHARITIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: GET_ALL_CHARITIES_ERROR,
        payload: error,
      });
    }
  };
}

export function getCharityNumber() {
  return async dispatch => {
    try {
      const res = await request.charity.getCharityNumber();
      const {data} = res;

      dispatch({
        type: GET_CHARITY_NUMBER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: GET_CHARITY_NUMBER_ERROR,
        payload: error,
      });
    }
  };
}
