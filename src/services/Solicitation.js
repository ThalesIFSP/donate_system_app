import api from '../api/base';

export const createSolicitation = formData =>
  api.post('/api/solicitation/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    auth: {
      username: 'thalesinfoifsp@gmail.com',
      password: 'thaleslindo',
    },
  });

export const getDonationNumber = () =>
  api.get('/api/donation/total-number', {
    auth: {
      username: 'thalesinfoifsp@gmail.com',
      password: 'thaleslindo',
    },
  });

export const getSolicitationsByUser = userId =>
  api.get(`/api/solicitation/user/${userId}/get-all`, {
    auth: {
      username: 'thalesinfoifsp@gmail.com',
      password: 'thaleslindo',
    },
  });

export const getSolicitationDetail = solicitationId =>
  api.get(`/api/solicitation/${solicitationId}`, {
    auth: {
      username: 'thalesinfoifsp@gmail.com',
      password: 'thaleslindo',
    },
  });

export const cancelSolicitation = (idSolicitation, idUser) =>
  api.put(
    `/api/solicitation/change-status/${idSolicitation}/cancel-user?idtUser=${idUser}`,
  );
