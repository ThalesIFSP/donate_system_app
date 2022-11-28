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

export const getPendingSolicitation = idModerator =>
  api.get(`/api/solicitation/moderator/${idModerator}/get-all`);

export const getModerator = idModerator =>
  api.get(`/api/moderator/${idModerator}`);

export const getWaitingSolicitation = idCharity =>
  api.get(`/api/solicitation/charity/${idCharity}/get-waiting-to-done`);

export const getSolicitationHistory = idUser =>
  api.get(`/api/solicitation/user/${idUser}/get-all/history`);

export const cancelSolicitation = (idSolicitation, idUser) =>
  api.put(
    `/api/solicitation/change-status/${idSolicitation}/cancel-user?idtUser=${idUser}`,
  );

export const acceptSolicitation = (idSolicitation, idModerator) =>
  api.put(
    `/api/solicitation/change-status/${idSolicitation}/accepted?idtModerator=${idModerator}`,
  );

export const refuseSolicitation = (idSolicitation, idModerator) =>
  api.put(
    `/api/solicitation/change-status/${idSolicitation}/refused?idtModerator=${idModerator}`,
  );

export const doneSolicitation = (idSolicitation, idModerator) =>
  api.put(
    `/api/solicitation/change-status/${idSolicitation}/done?idtModerator=${idModerator}`,
  );

export const cancelModeratorSolicitation = (idSolicitation, idModerator) =>
  api.put(
    `/api/solicitation/change-status/${idSolicitation}/cancel?idtModerator=${idModerator}`,
  );
