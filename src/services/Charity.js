import api from '../api/base';

export const getAllCharities = () =>
  api.get('/api/charity/v2/get-all?page=0&pageSize=10');

export const getCharityNumber = () => api.get('/api/charity/total-number');
