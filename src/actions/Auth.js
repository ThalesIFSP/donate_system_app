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
import request, {responseError} from '../services';

export function register(address, device, document, email, phone, name, pass) {
  return async dispatch => {
    try {
      const user = {
        address,
        device,
        document,
        email,
        phone,
        name,
        pass,
        sendEmail: true,
        sendWhatsApp: true,
      };
      const res = await request.auth.register(user);
      const {data} = res;

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: REGISTER_ERROR,
        payload: error,
      });
    }
  };
}

export function login(email, password) {
  return async dispatch => {
    try {
      const login = {email, pass: password};
      const res = await request.auth.login(login);

      const {data} = res;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
    }
  };
}

export function editSendNotification(idUser, sendEmail, sendWhatsapp) {
  return async dispatch => {
    try {
      const res = await request.auth.editSendNotification(
        idUser,
        sendEmail,
        sendWhatsapp,
      );
      const {data} = res;

      dispatch({
        type: EDIT_SEND_NOTIFY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: EDIT_SEND_NOTIFY_ERROR,
        payload: error,
      });
    }
  };
}

export function editUser(idUser, user) {
  return async dispatch => {
    try {
      console.log(user);
      await request.auth.editUser(idUser, user);
      dispatch({
        type: EDIT_USER_SUCCESS,
      });
    } catch (error) {
      console.log(error, '<---ERROR');
      dispatch({
        type: EDIT_USER_ERROR,
        payload: error,
      });
    }
  };
}
