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
import request, {responseError} from '../services';

export function createSolicitation(
  address,
  assortment,
  isNameless,
  isPickup,
  items,
  title,
  userId,
  images,
) {
  return async dispatch => {
    try {
      const formData = new FormData();

      var assortmentString = '';
      await assortment.forEach((assort, index) => {
        console.log(index, assort);
        if (index === 0) {
          assortmentString += assort;
        } else {
          assortmentString += ',' + assort;
        }
      });

      var itemsModel = items.map(item => {
        return {desc: item.title, expirationDate: item.expirationDate};
      });

      var solicitationData = {
        assortment: assortmentString,
        isNameless,
        isPickup,
        items: itemsModel,
        title,
        userId,
      };

      if (isPickup) {
        solicitationData = {
          ...solicitationData,
          address,
        };
      }

      formData.append('solicitation', JSON.stringify(solicitationData));
      await images.forEach((image, index) =>
        formData.append('files', {
          uri: image.uri,
          type: image.type,
          name: 'img-' + index,
        }),
      );

      console.log(formData);
      const res = await request.solicitation.createSolicitation(formData);
      const {data} = res;

      dispatch({
        type: CREATE_SOLICITATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: CREATE_SOLICITATION_ERROR,
        payload: error,
      });
    }
  };
}

export function getDonationNumber() {
  return async dispatch => {
    try {
      const res = await request.solicitation.getDonationNumber();
      const {data} = res;

      dispatch({
        type: GET_DONATION_NUMBER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: GET_DONATION_NUMBER_ERROR,
        payload: error,
      });
    }
  };
}

export function getSolicitationsByUser(userId) {
  return async dispatch => {
    try {
      const res = await request.solicitation.getSolicitationsByUser(userId);
      const {data} = res;

      dispatch({
        type: GET_SOLICITATIONS_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: GET_SOLICITATIONS_USER_ERROR,
        payload: error,
      });
    }
  };
}

export function getSolicitationDetail(solicitationId) {
  return async dispatch => {
    try {
      const res = await request.solicitation.getSolicitationDetail(
        solicitationId,
      );
      const {data} = res;

      dispatch({
        type: GET_SOLICITATION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: GET_SOLICITATION_DETAIL_ERROR,
        payload: error,
      });
    }
  };
}

export function cancelSolicitation(solicitationId, idUser) {
  return async dispatch => {
    try {
      const res = await request.solicitation.cancelSolicitation(
        solicitationId,
        idUser,
      );
      const {data} = res;

      dispatch({
        type: CANCEL_SOLICITATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: CANCEL_SOLICITATION_ERROR,
        payload: error,
      });
    }
  };
}
