import axios from 'axios';

import { getToken, getRefreshToken, setToken } from '../Utils/account';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const apiRefreshToken = (refreshToken: string) => {
  const URL = '/refresh';
  const options = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  return api.post(URL, {}, options);
};

export const getHeaders = () => {
  const token = getToken();
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const apiPost = (path: string, data: object) => {
  const options = {
    headers: getHeaders(),
  };

  return api.post(path, data, options);
};

export const apiGet = (path: string, params: object = {}) => {
  const options = {
    params,
    headers:  getHeaders(),
  };

  return api.get(path, options);
};

export default api;