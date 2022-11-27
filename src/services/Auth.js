import api from '../api/base';

export const login = login => api.post('/api/user/login', login);

export const register = user =>
  api.post('/api/user/create', user, {
    auth: {
      username: 'thalesinfoifsp@gmail.com',
      password: 'thaleslindo',
    },
  });

export const getUserByEmail = email =>
  api.get('/api/user/email?email=' + email, {
    auth: {
      username: 'thalesinfoifsp@gmail.com',
      password: 'thaleslindo',
    },
  });

export const editSendNotification = (idUser, sendEmail, sendWhatsapp) =>
  api.put(
    `/api/user/${idUser}/message-config?sendEmail=${sendEmail}&sendWhatsapp=${sendWhatsapp}`,
    {
      auth: {
        username: 'thalesinfoifsp@gmail.com',
        password: 'thaleslindo',
      },
    },
  );

export const editUser = (idUser, user) =>
  api.put(
    `/api/user/${idUser}`,
    {
      address: user.address,
      device: user.device,
      document: user.document,
      email: user.email,
      name: user.name,
      pass: user.pass,
      phone: user.phone,
      sendEmail: user.sendEmail,
      sendWhatsApp: user.sendWhatsApp,
    },
    {
      headers: {
        'Content-type': 'application/json',
      },
      auth: {
        username: 'thalesinfoifsp@gmail.com',
        password: 'thaleslindo',
      },
    },
  );
