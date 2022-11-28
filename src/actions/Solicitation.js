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
import request from '../services';

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

export function getPendingSolicitation(idModerator) {
  return async dispatch => {
    try {
      const res = await request.solicitation.getPendingSolicitation(
        idModerator,
      );
      const {data} = res;

      dispatch({
        type: PENDING_SOLICITATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: PENDING_SOLICITATION_ERROR,
        payload: error,
      });
    }
  };
}

export function getWaitingSolicitation(idCharity) {
  return async dispatch => {
    try {
      const res = await request.solicitation.getWaitingSolicitation(idCharity);
      const {data} = res;

      dispatch({
        type: WAITING_SOLICITATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: WAITING_SOLICITATION_ERROR,
        payload: error,
      });
    }
  };
}

export function getSolicitationHistory(idUser) {
  return async dispatch => {
    try {
      const res = await request.solicitation.getSolicitationHistory(idUser);
      const {data} = res;

      dispatch({
        type: SOLICITATION_HISTORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: SOLICITATION_HISTORY_ERROR,
        payload: error,
      });
    }
  };
}

export function getModerator(idModerator) {
  return async dispatch => {
    try {
      const res = await request.solicitation.getModerator(idModerator);
      const {data} = res;

      dispatch({
        type: GET_MODERATOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: GET_MODERATOR_ERROR,
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

export function acceptSolicitation(solicitationId, moderatorId) {
  return async dispatch => {
    try {
      const res = await request.solicitation.acceptSolicitation(
        solicitationId,
        moderatorId,
      );
      const {data} = res;

      dispatch({
        type: ACCEPT_SOLICITATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: ACCEPT_SOLICITATION_ERROR,
        payload: error,
      });
    }
  };
}

export function refuseSolicitation(solicitationId, moderatorId) {
  return async dispatch => {
    try {
      const res = await request.solicitation.refuseSolicitation(
        solicitationId,
        moderatorId,
      );
      const {data} = res;

      dispatch({
        type: REFUSE_SOLICITATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: REFUSE_SOLICITATION_ERROR,
        payload: error,
      });
    }
  };
}

export function doneSolicitation(solicitationId, moderatorId) {
  return async dispatch => {
    try {
      const res = await request.solicitation.doneSolicitation(
        solicitationId,
        moderatorId,
      );
      const {data} = res;

      dispatch({
        type: DONE_SOLICITATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: DONE_SOLICITATION_ERROR,
        payload: error,
      });
    }
  };
}

export function cancelModeratorSolicitation(solicitationId, moderatorId) {
  return async dispatch => {
    try {
      const res = await request.solicitation.cancelModeratorSolicitation(
        solicitationId,
        moderatorId,
      );
      const {data} = res;

      dispatch({
        type: CANCEL_MOD_SOLICITATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: CANCEL_MOD_SOLICITATION_ERROR,
        payload: error,
      });
    }
  };
}
