import axios from 'axios';

import { getToken } from '../Utils/account';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

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

export const apiGet = (path: string, params: object = {}, authorization: boolean = false) => {
  const options = {
    params,
    headers: authorization ? getHeaders() : {},
  };

  return api.get(path, options);
};

export default api;