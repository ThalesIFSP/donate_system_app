import axios from 'axios';

const api = axios;

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject({error: error});
  },
);

export async function initializeAxios() {
  const DOMAIN_URL = 'http://192.168.1.130:9095/';

  const headers = {
    'Content-Type': 'application/json',
    token: 'RG9uYXRpb24gdXNlciBhZG1pbg==',
  };

  axios.defaults.baseURL = DOMAIN_URL;
  axios.defaults.headers.common = headers;

  console.log('Connected');
}

export default api;
