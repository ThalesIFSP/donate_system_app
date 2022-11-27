import * as auth from './Auth';
import * as charity from './Charity';
import * as solicitation from './Solicitation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const request = {
  auth,
  charity,
  solicitation,
};

async function _signOutAsync() {
  await AsyncStorage.removeItem('@user');
  await AsyncStorage.removeItem('@user-token');
  delete axios.defaults.headers.common('token');
}

export const responseError = e => {
  const err = {
    status: 0,
    message: 'Ocorreu algum erro inesperado',
  };

  console.log(e);
};

export default request;
